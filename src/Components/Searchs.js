import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Searchs() {
    const [search, setSearch] = useSearchParams();
    const [inputSearch, setInputSearch] = useState(search.get('search'));
    const onSearch = (value) => {
        setSearch({search:value});
    }
    const onChange = (e) =>{
            setInputSearch(e.target.value);
    }
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(!inputSearch){
                search.delete('search');
                setSearch(search);
            }else{
                search.set('search', inputSearch);
                setSearch(search);
            }
        }, 1500);
        return ()=>clearTimeout(timer);
    },[inputSearch])
    return ( 
        <Search  onSearch={onSearch}
        onChange={onChange} defaultValue={inputSearch}
        value={inputSearch}
       placeholder="Tìm sản phẩm"
       allowClear
        style={{ marginRight:'20px' }}  size='middle'></Search>
     );
}

export default Searchs;