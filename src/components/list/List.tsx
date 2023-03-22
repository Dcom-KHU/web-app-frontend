'use client';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import css from 'styled-jsx/css';
import EachList from './EachList';
import ListItem from './ListItem';

const ListItemBox = styled.div`
  width: 80%;
  max-width: 1200px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  padding: 30px 0;
  ${(props) => {
    if (props.emptyData) {
      return css`
        display: flex;
        justify-content: center;
      `;
    }
    return css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      row-gap: 30px;
      justify-items: center;
    `;
  }}
`;

// ************************************************************************************************
// Type 'string' is not assignable to type 'keyof DetailPageState'.ts(2322)
// ListItem.tsx(39, 3): The expected type comes from property 'nowState'
// which is declared here on type 'IntrinsicAttributes & { nowState: keyof DetailPageState; }'
// ************************************************************************************************
// 해당 오류는 nowState 프로퍼티에 keyof DetailPageState 타입을 지정해두었지만, DUMMY_DATA 배열의 nowState 값은 string 형태이기 때문에 발생하는 오류입니다.
// 해결 방법으로는 nowState 프로퍼티의 타입을 string으로 지정하거나, DUMMY_DATA의 nowState 값을 DetailPageState 타입의 enum 값으로 변경하는 방법이 있습니다.
enum NowState {
  Board = 'board',
  Sale = 'sale',
  Exchange = 'exchange',
  Free = 'free',
  Auction = 'auction',
  Group = 'group',
}
// 게시글 더미 데이터
interface ListProps {
  dataList?: [];
  activeType?: string;
}
// 게시물 목록들
const List = ({ dataList, activeType }: ListProps) => {
  // dataList가 비어있는 경우를 대비하여.
  let emptyData = true;
  if (dataList && dataList.length !== 0) {
    emptyData = false;
  }

  let nowState = useSelector((state: RootState) => state.activePage.active);
  if (activeType) {
    nowState = activeType;
  }

  const isBoard = nowState === 'board';
  return (
    <ListItemBox emptyData={emptyData}>
      {emptyData && <h1>게시글이 없어요.</h1>}
      {!emptyData &&
        (isBoard ? (
          <>
            {dataList?.map((data) => (
              <ListItem key={data.id} nowState={data.type} />
            ))}
          </>
        ) : (
          <>
            <EachList dataList={dataList} activeType={activeType} />
          </>
        ))}
    </ListItemBox>
  );
};
export default List;
