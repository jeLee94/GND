import { dbService } from '../firebase';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';

// collectionName -> 컬렉션 이름,
// limitCount -> 총 몇개의 데이터를 끊어서 요청할건지,
// target -> 교차 요소 (요소의 ref 전달)

const usePagination = (
  collectionName: any,
  limitCount: any,
  target: any,
  category: any,
  categorylist: string[]
) => {
  const [data, setData] = useState<object[]>([]); // 불러온 문서들 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [loadingMore, setLoadingMore] = useState(false); // 추가 요청시 로딩 상태
  const [key, setKey] = useState<QueryDocumentSnapshot>(); // 마지막으로 불러온 스냅샷 상태
  const [noMore, setNoMore] = useState(false); // 추가로 요청할 데이터 없다는 flag

  // 첫번째 페이지 요청 함수
  const getFirstPage = useCallback(async () => {
    const queryRef = query(
      collection(dbService, collectionName),
      category !== 'all'
        ? where('category', '==', category)
        : where('category', 'in', categorylist.slice(1)),
      orderBy('title', 'desc'), // 최신 작성순으로 정렬
      limit(limitCount)
    );
    try {
      setLoading(true);

      const snap = await getDocs(queryRef);
      const docsArray = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 문서 저장
      setData(docsArray);

      // 커서로 사용할 마지막 문서 스냅샷 저장
      setKey(snap.docs[snap.docs.length - 1]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [collectionName, limitCount, category]);

  // 추가 요청 함수
  const loadMore = useCallback(
    async (loadCount: any) => {
      const queryRef = query(
        collection(dbService, collectionName),
        category !== 'all'
          ? where('category', '==', category)
          : where('category', 'in', categorylist.slice(1)),
        orderBy('title', 'desc'),
        startAfter(key), // 마지막 커서 기준으로 추가 요청을 보내도록 쿼리 전송
        limit(loadCount)
      );
      try {
        const snap = await getDocs(queryRef);
        snap.empty
          ? setNoMore(true) // 만약 스냅샷이 존재 하지 않는다면 더이상 불러올수 없다는 flag 설정
          : setKey(snap.docs[snap.docs.length - 1]); // 존재한다면 처음과 마찬가지고 마지막 커서 저장
        const docsArray = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData([...data, ...docsArray]); // 기존 데이터와 합쳐서 상태 저장
      } catch (err) {
        console.log(err);
      }
    },
    [collectionName, data, key]
  );

  // 지정된 요소가 화면에 보일때 실행할 콜백함수
  const onIntersect: IntersectionObserverCallback = useCallback(
    async ([entry]: any, observer: any) => {
      // 만약에 지정한 요소가 화면에 보이거나 현재 데이터를 더 불러오는 상황이 아닐경우,
      // 기존 요소의 주시를 해체하고 추가로 3개의 문서를 더 불러오도록 설정
      if (entry.isIntersecting && !loadingMore) {
        observer.unobserve(entry.target);
        setLoadingMore(true);
        await loadMore(4);
        setLoadingMore(false);
      }
    },
    [loadMore, loadingMore]
  );

  // 처음 화면이 랜더링 되었을때 첫번째 페이지를 문서를 가져오도록 설정
  useEffect(() => {
    getFirstPage();
  }, [category]);

  // target 요소의 ref가 전달되었을때 해당 요소를 주시할수 있도록 observer 인스턴스 생성후 전달
  useEffect(() => {
    let observer: any;
    if (target && !noMore) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0,
      });
      observer.observe(target);
    }
    // 메모리 해제 작업
    return () => {
      setLoading(false);
      setLoadingMore(false);
      observer && observer.disconnect();
    };
  }, [target, onIntersect, noMore]);

  return { data, loading, loadingMore, noMore };
};

export default usePagination;
