import React , {useEffect , useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBContainer
} from 'mdb-react-ui-kit';
import infoService from '../services/info-service';


export default function ListComponent(props) {
    let [AllInfoData , setAllInfoData] = useState(null);
    let {infoData , setInfoData} = props;
    let navigate = useNavigate();
    
    useEffect(() => {
        setInfoData(null);
        infoService.getAllInfo().then((data) => {
            console.log(data);
            setAllInfoData(data.data.info);
        }).catch((error) => {
            console.log(error);
        });
    } , []);
    
    function checkInfo(_id) {
        infoService.get(_id).then((check_data) => {
            console.log(check_data);
            setInfoData(check_data.data);
          }).catch((error) => {
            console.log(error);
        })
    }

  return (
    <div className='col-6'>
        {AllInfoData != null && (
            <section className='d-flex justify-content-center w-100'>
                {
                    AllInfoData.map((one_data) => (
                        <MDBCard className='ms-2 me-2'>
                            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                
                                <MDBCardImage src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg" fluid alt='...' />
                                <a>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                </a>
                            </MDBRipple>
                            <MDBCardBody>
                                <MDBCardTitle>{one_data.name}</MDBCardTitle>
                                <MDBCardText>
                                    病歷號:{one_data._id}
                                    <br />
                                    飼主:{one_data.owner}
                                </MDBCardText>
                                <MDBCardText>
                                    {one_data.remark}
                                </MDBCardText>
                                <MDBBtn onClick={() => checkInfo(one_data._id)}>查看</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    ))
                }
            </section>
            
        )}
    </div>
   
    
  );
}