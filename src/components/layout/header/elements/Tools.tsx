import { searchToggleActions } from '@/store/searchToggle/searchToggleSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const ToolsBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;

  img:hover {
    transform: scale(1.2);
  }
  button {
    position: relative;
  }

  // 작은 화면
  @media screen and (max-width: 707px) {
    display: none;
  }
`;

// 상단 헤더 도구들 (검색 ~ 유저)
const Tools = () => {
  const dispatch = useDispatch();
  const searchToggleHandler = () => {
    dispatch(searchToggleActions.searchToggle());
  };
  return (
    <ToolsBox>
      <button onClick={searchToggleHandler}>
        <Image
          src='/images/header/search.svg'
          alt='search'
          width={24}
          height={21}
        />
      </button>
      <Link href='#'>
        <Image
          src='/images/header/heart.svg'
          alt='heart'
          width={24}
          height={21}
        />
      </Link>
      <Link href='#'>
        <Image
          src='/images/header/message.svg'
          alt='message'
          width={24}
          height={21}
        />
      </Link>
      <Link href='#'>
        <Image
          src='/images/header/user.svg'
          alt='user'
          width={24}
          height={21}
        />
      </Link>
    </ToolsBox>
  );
};
export default Tools;
