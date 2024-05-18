import React from 'react'
import { Form } from "react-bootstrap"

const FormInput = ({errors, content, attributes, type}) => {

    return (<>
        <Form.Group className="mb-3">
            {errors ? (
                <Form.Label style={{ color: "red" }}>
                    {errors?.message}
                </Form.Label>) : (<Form.Label>{content}</Form.Label>)}
            <Form.Control
                style={Boolean(errors?.message) ? { borderColor: "red" } : { borderColor: "" }}
                {...attributes}
                type={type}
                placeholder="" />
        </Form.Group>
    </>)
}

export default FormInput