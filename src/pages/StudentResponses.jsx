import React, { useEffect, useState } from 'react'
import { Container, Footer, Header } from 'rsuite'
import { StudentNavbar } from '../StudentComponents/StudentNavbar'
import { FooterStudent } from '../StudentComponents/FooterStudent'
import { useParams } from 'react-router-dom'
import { getResponsesByResultId } from '../service/ResultService'
import { Card, Form } from 'react-bootstrap'
import '../cssPages/ResponseCard.css'
import { HeaderWebsite } from '../components/Header'
export const StudentResponses = () => {
    const {examResultId} = useParams();
    const [resultResponses, setResultResponses] = useState([])
    useEffect(() => {
        getResponsesByResultId(examResultId)
            .then((data)=> setResultResponses(data))
    }, [])

    const QuestionResponse = ({questionResponse}) => {
        const {question, selectedOptions} = questionResponse;
        const {description, options, correctOptions} = question;
        return(
            <>
                <Card className='response-card'>
                    <Card.Body>
                    <Card.Title>{description}</Card.Title>
                    <Form>
                        {options.map((option, index)=>(
                            <div className='d-flex justify-content-start' key={option} style={{marginTop:'5px'}}>
                            <Form.Check
                                key={index}
                                type='radio'
                                disabled
                                checked={selectedOptions.includes(option)}
                            />
                                <label style={{
                                    color:'black',
                                    backgroundColor: correctOptions.includes(option)
                                        ? '#66e699a8' : selectedOptions.includes(option)?
                                        '#e64d4da4' : null,
                                        marginLeft:'5px', padding:'1px 20px 1px 5px',
                                        borderRadius:'5px'
                                }}>{option}</label>
                            </div>
                        ))}
                    </Form>
                    </Card.Body>
                </Card>
            </>
        )
    }
    
  return (
    <div>
        <Header>
            <HeaderWebsite/>
        </Header>

        <Container style={{minHeight:'82vh'}}>
            {resultResponses.map((resultResponse, index)=> (
                <QuestionResponse key={index} questionResponse={resultResponse} />
            ))}
        </Container>

        <Footer>
            <FooterStudent/>
        </Footer>
    </div>
  )
}
