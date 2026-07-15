import React, { useEffect, useState } from "react";
import decod from "../../assets/Logo.png";
import "./style.css";
const PrivacyPolicy = () => {

    const [privacyPolicy, setPrivacyPolicy] = useState({});
    const [termsOfService, setTermsOfService] = useState({});

    useEffect(() => {
        const loadPolicy = async () => {
            const policyUrls = [...new Set([
                `${process.env.PUBLIC_URL}/policy.json`,
                '/policy.json'
            ])];

            for (const url of policyUrls) {
                try {
                    const response = await fetch(url);

                    if (!response.ok) {
                        continue;
                    }

                    const data = await response.json();
                    setPrivacyPolicy(data.privacyPolicy);
                    setTermsOfService(data.tos);
                    return;
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            }
        };

        loadPolicy();

        return () => {
            console.log("unMount");
        }
    }, []);
    return (
        <div className="privacymain">
            <img alt="Decod Games" className='decodlogo' src={decod} />
            <div className="container">

                <h1>
                    Privacy Policy
                </h1>

                {Object.entries(privacyPolicy).map(([key, value]) => {
                    if (value.heading) {
                        return <div key={key}>
                            <h3>{value.heading}</h3>
                            <div className="paragraph" dangerouslySetInnerHTML={{ __html: value.content.replaceAll('\n','<br>') }} />
                            {/* <p>{value.content.replaceAll('\n','<br>')}</p> */}
                        </div>
                    } else {
                        return <p className="paragraph" key={key}>{value.content}</p>
                    }
                })}

                <h1>
                    Terms Of Service
                </h1>

                {Object.entries(termsOfService).map(([key, value]) => {
                    if (value.heading) {
                        return <div key={key}>
                            <h3>{value.heading}</h3>
                            <div className="paragraph" dangerouslySetInnerHTML={{ __html: value.content.replaceAll('\n','<br>') }} />
                        </div>
                    } else {
                        return <div className="paragraph" key={key} dangerouslySetInnerHTML={{ __html: value.content.replaceAll('\n','<br>') }} />
                    }
                })}

            </div>
        </div>
    );
}

export default PrivacyPolicy;
