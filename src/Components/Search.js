import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

function Searchs (){
    // const [search, setSearch] = useSearchParams();
    // const [inputSearch, setInputSearch] = useState(search.get('find'));
    // const onSearch = (value) => {
    //     setSearch({find:value});
    // }
    // const onChange = (e) =>{
    //     const searchValue = e.target.value.replace(/[^a-z 0-9]/gi, '');
    //     if(inputSearch !== searchValue)
    //         setInputSearch(searchValue);
    //     else
    //         alert("Không nhập kí tự đặc biệt")
    // }
    // useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         if(!inputSearch){
    //             search.delete('find');
    //             setSearch(search);
    //         }else{
    //             search.set('find', inputSearch);
    //             setSearch(search);
    //         }
    //     }, 1500);
    //     return ()=>clearTimeout(timer);
    // },[inputSearch])
    return (
        <div style={{
          margin:'10px'
        }}  direction="vertical">
          <Search
        //   style={{
        //       width: '100%',
        //     }}
            //  defaultValue={inputSearch}
            //  value={inputSearch}
            placeholder="Tìm sản phẩm"
            allowClear
            enterButton="Search"
            size="middle"
            // onSearch={onSearch}
            // onChange={onChange}
          />
          
        </div>
      );
} 
export default Searchs;