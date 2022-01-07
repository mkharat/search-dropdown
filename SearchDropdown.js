import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import { customStyle } from "../styles";

class SearchDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsList: [],
        };
    }
    componentDidMount = async () => {};
    onSearchChange = async (e) => {
        let query = e.currentTarget.value;
        if (query && query.length >= 2) {
            // here can call api using query and get results
            // after you get result update that values like following
            let optionsList = [
                { key: "key", value: "value.id", text: "ABCD" },
                { key: "key1", value: "value.id2", text: "XYZ" },
            ];
            this.setState({ optionsList: optionsList });
        }
    };
    onOptionChange(e, value, field, values, setValues) {
        // update dynamic form
        let selectedItem = this.state.optionsList.find((element) => {
            return element.key === value;
        });
        console.log(selectedItem);
    }
    handleSubmit = async (values, { setErrors, setSubmitting }) => {
        console.log(values);
    };
    render() {
        let schemas = Yup.object().shape({
            query: Yup.string(),
        });
        return (
            <React.Fragment>
                <Card className="custom-card" style={{ border: 0 }}>
                    <Card.Header as="h5" style={customStyle.headStyle}>
                        Create Candidate
                    </Card.Header>
                    <Card.Body>
                        <Card style={customStyle.whiteCard}>
                            <Formik
                                enableReinitialize
                                initialValues={this.state.initialValues}
                                validationSchema={schemas}
                                onSubmit={this.handleSubmit}
                            >
                                {({
                                    errors,
                                    values,
                                    touched,
                                    setValues,
                                    setFieldValue,
                                }) => (
                                    <Form>
                                        <Col md={12} className="mt-4">
                                            <div
                                                className="form-group custom-form-group"
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                <label
                                                    htmlFor="query"
                                                    className="formik-label"
                                                >
                                                    Search
                                                </label>
                                                <Field
                                                    name="query"
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                >
                                                    {({ field }) => (
                                                        <Dropdown
                                                            placeholder="Search Here..."
                                                            fluid
                                                            search
                                                            selection
                                                            options={
                                                                this.state
                                                                    .optionsList
                                                            }
                                                            {...field}
                                                            className={
                                                                "form-control" +
                                                                (errors.query &&
                                                                touched.query
                                                                    ? " is-invalid"
                                                                    : "")
                                                            }
                                                            onSearchChange={
                                                                this
                                                                    .onSearchChange
                                                            }
                                                            onChange={(
                                                                e,
                                                                { value }
                                                            ) =>
                                                                this.onOptionChange(
                                                                    e,
                                                                    value,
                                                                    field,
                                                                    values,
                                                                    setValues
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    name="query"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>
                                    </Form>
                                )}
                            </Formik>
                        </Card>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}
export default SearchDropdown;
