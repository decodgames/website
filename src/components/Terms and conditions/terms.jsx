import React, { useEffect, useState } from "react";
import decod from "../../assets/Logo.png";
import './terms.css'
const Terms=()=>{

const [termsOfService, setTermsOfService] = useState({});

  useEffect(() => {
        fetch('https://flight2987.web.app/policy.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTermsOfService(data.tos);
            })
            .catch(error => console.error('Error fetching data: ', error));

        return () => {
            console.log("unMount");
        }
    }, []);

    return (
        <div className="termsmain" id="terms">
            <img alt="Decod Games" className='decodlogo' src={decod} />
            <div className="containermain">
     
            <h1>
                    Terms Of Service
                </h1>
                {Object.entries(termsOfService).map(([key, value]) => {
                    if (value.heading) {
                        return <div key={key}>
                            <h3>{value.heading}</h3>
                            <p className="paragraphs">{value.content}</p>
                        </div>
                    } else {
                        return <p className="paragraphs" key={key}>{value.content}</p>
                    }
                })}
                
            </div>
        </div>
    );
}
export default Terms;
