

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const EditForm = () => {

    const { no } = useParams(); 

    const navigate = useNavigate();


    //const [personVo, setPersonVo] = useState([]);
    const [name, setName] = useState('');
    const [hp, setHp] = useState('');
    const [company, setCompany] = useState('');


    /*---일반 변수 --------------------------------------------*/

    /*---상태관리 변수들(값이 변하면 화면 랜더링) ----------*/

    /*---일반 메소드 --------------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/


    //이름
    const handleName = (e)=>{
        console.log("이름입력");
        setName(e.target.value);
    };

    //핸드폰
    const handleHp = (e)=>{
        console.log("핸드폰 입력");
        setHp(e.target.value);
    };

    //회사번호
    const handleCompany = (e)=>{
        console.log("회사 입력");
        setCompany(e.target.value);
    };



    //수정버튼을 클릭했을때
    const handleUpdate = (e) => {

        e.preventDefault();
        console.log("전송");

        const personVo = {
            personId: no,
            name: name,
            hp: hp,
            company: company
        }
        console.log(personVo);


        //수정 값 서버에 전송

        axios({

            method: 'put',// put, post, delete

            url: `http://localhost:9000/api/persons/${no}`, //get delete

            headers: { "Content-Type": "application/json; charset=utf-8" }, // post put

            data: personVo, // put, post, JSON(자동변환됨)


            responseType: 'json' //수신타입

        }).then(response => {

            console.log(response); //수신데이타

            if (response.data.result === 'success') {
                //리다이렉트
                navigate("/list2");
            } else {
                alert(response.data.message);
            }


        }).catch(error => {

            console.log(error);

        });

    };




    //로딩->마운트 되었을때
    useEffect( ()=>{

        console.log("마운트 되었을때");
        console.log(no);
        //서버로 no값을 보내서 no데이터 받기 그리고 화면에 출력하기

        axios({

            method: 'get', // put, post, delete
            
            url: `http://localhost:9000/api/persons/${no}`, //get delete
            
            responseType: 'json' //수신타입
            


        }).then(response => {
        
            console.log(response); //수신데이타
            //console.log(response.data.apiData.name);
            //console.log(response.data.apiData.hp);
            //console.log(response.data.apiData.company);



            if (response.data.result === 'success') {
                //성공 시 로직
                //setPersonVo(response.data.apiData);
                setName(response.data.apiData.name);
                setHp(response.data.apiData.hp);
                setCompany(response.data.apiData.company);

            } else {
                //실패 시 로직, 리다이엑트로 보내기
                navigate("/list2");

            }


        
        }).catch(error => {
        
            console.log(error);
        
        });

    }, [] );




    return (

        <>
            <h1>전화번호부</h1>

            <h2>전화번호-수정폼</h2>

            <p>수정할 항목을 입력한 후 수정버튼을 클릭해 주세요</p>

            <form action="" method="" onSubmit={handleUpdate}>     

                <div>
                    <label htmlFor="txt-name">이름(name):</label> 
                    <input id="txt-name" type="text" name="" value={name} placeholder="이름" onChange={handleName} />
                </div>
                
                <div>
                    <label htmlFor="txt-hp">핸드폰(hp):</label> 
                    <input id="txt-hp" type="text" name="" value={hp} placeholder="핸드폰" onChange={handleHp} />
                </div>
                
                <div>
                    <label htmlFor="txt-company">회사(company):</label> 
                    <input id="txt-company" type="text" name="" value={company} placeholder="회사" onChange={handleCompany} />
                </div>
                
                
                
                <br />
                <button type="submit">수정(전송)</button>
            </form>

            <br /><br />
            <Link to="/list2" rel="noreferrer noopener">리스트로 가기</Link>
        </>
           

    );

}

export default EditForm;