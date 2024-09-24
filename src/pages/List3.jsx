//import 라이브러리

import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';//, useNavigate } from 'react-router-dom';
import axios from 'axios';



//import 컴포넌트
import ItemPerson from './ItemPerson';


//import css


const List3 = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [personList, setPersonList] = useState([]);

    /*
    //리다이렉트 (같은 페이지의 리다이렉트는 안된다)
    const navigate = useNavigate();
    */

    /*---일반 메소드 --------------------------------------------*/
    const getPersonList = ()=>{
        axios({

            method: 'get',
            url: 'http://localhost:9000/api/persons',

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data); //수신데이타
            
            setPersonList(response.data.apiData);

            

        }).catch(error => {
            console.log(error);

        });


    }




    /*---일반 변수 --------------------------------------------*/






    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    //마운트 되었을때            //맨처음 마운트 되었을떄 한번만됨 그래서 새로고침이 안됨
    useEffect( ()=>{

        console.log("마운트 온");

        //서버에서 데이터 가져오기 와서 그리기
        getPersonList();

        //html과 섞어서 출력


    }, [] );


    //삭제 버튼 클릭했을때
    const handleDel = (no) => {
        console.log('삭제버튼 클릭');

        axios({

            method: 'delete',
            url: `http://localhost:9000/api/persons/${no}`,

            responseType: 'json' //수신타입

        }).then(response => {
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            console.log(response.data); //수신데이타
            console.log(response);
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");


            if ( response.data.result === 'success' ) {
                /*
                //리다이렉트 (같은 페이지의 리다이렉트는 안된다)
                navigate("/list2"); //자기페이지에서는 새로고침이 안된다
                */
                //getPersonList();

                //우리가 가지고 있는 리스트(배열) 에서 방금 삭제한 값만 제거된 새로운 배열
                let newArray = personList.filter( (person)=>(person.personId !== no) );
                
                setPersonList( newArray );



            } else {
                alert(response.data.message);
            }
            
            

        }).catch(error => {
            console.log(error);

        });

    };






    return (

        <>

            <h1>전화번호부</h1>

            <h2>전화번호-리스트</h2>

            <p>등록된 전화번호 리스트 입니다.</p>

            { personList.map ( ( personVo )=>   {
                return( 
                    <div >
                        {/*파라미터라도 "동작을 줄수있다" */}
                        <ItemPerson key={personVo.personId} 
                                    person = {personVo} 
                                    delPerson={handleDel}  
                        />

                    </div>
              )   }) }



            <br />
			<Link to="/writeform" rel="noreferrer noopener">등록폼으로 이동</Link>
            <br /><br /><br /><br /><br />

        </>

    );

}

export default List3;