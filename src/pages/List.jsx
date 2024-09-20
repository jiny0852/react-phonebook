//import 라이브러리

import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//import 컴포넌트


//import css


const List = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [personList, setPersonList] = useState([]);

    /*---일반 메소드 --------------------------------------------*/
    const getPersonList = ()=>{
        axios({

            method: 'get',
            url: 'http://localhost:9000/api/persons',

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data); //수신데이타
            
            setPersonList(response.data);

        }).catch(error => {
            console.log(error);

        });


    }




    /*---일반 변수 --------------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    //마운트 되었을때
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
            url: 'http://localhost:9000/api/persons/' + no,

            responseType: 'json' //수신타입

        }).then(response => {
            console.log(response.data); //수신데이타

            if (response.data === 1) {

            } else {
                console.log("전송실패");
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

            { personList.map ( ( personVo )=>{
                return( //자바코드 영역 화면html쓸떄는 리턴으로
                <div key={personVo.personId}>
                    <table border="1" >
                        <tbody>
                            <tr>
                                <th>이름(name)</th>
                                <td>{personVo.name}</td>
                            </tr>
                            <tr>
                                <th>핸드폰(hp)</th>
                                <td>{personVo.hp}</td>
                            </tr>
                            <tr>
                                <th>회사(company)</th>
                                <td>{personVo.company}</td>
                            </tr>
                            <tr>
                                <td><Link to="/editform/" rel="noreferrer noopener">[수정폼으로 이동]</Link></td>
                                <td><button type="button" onClick={ ()=>{ handleDel(personVo.personId) } }>[삭제]</button></td>
                            </tr>
        
                        </tbody>
                    </table>
                    <br />

                </div>
                );
            
            })}



            <br />
			<Link to="" target="_blank" rel="noreferrer noopener">등록폼으로 이동</Link>

        </>

    );

}

export default List;