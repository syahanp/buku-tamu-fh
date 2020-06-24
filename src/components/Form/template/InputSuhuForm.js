/* eslint-disable array-callback-return */
import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { toast } from "react-toastify";
import { baseUrl } from '../../../api'

import { Button } from '../../Buttons'
import SquareInput from '../../Form/SquareInput';

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        nama: Yup.string()
            .min(2, '*Nama terlalu pendek')
            .required('*Nama dibutuhkan')
    }),
    
    mapPropsToValues: () => ({
        id : '',
        suhu_keluar : '',
    }),
    
    handleSubmit: (values, {setSubmitting, setStatus, props}) => {
        setSubmitting(true)

        baseUrl.put(`api/kunjungan`, {...values})
        .then(res => {
            console.log(res.data);
            setSubmitting(false);
            props.setOpen(false)

            toast.success('Suhu Keluar Berhasil Tersimpan', {
                autoClose: 2500,
                hideProgressBar: true,
            });
        })
        .catch(err => {
            console.log(err.response);
            setSubmitting(false)
        })
    },
    displayName: 'Update Form',
  });

const InputSuhuKeluar = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status
    } = props;

    const handleErrorResponse = (data) => {
        if (Array.isArray(data) && data.length > 1) {
            let store = []
            data.map((x, i) => {
                store = [...store, <li key={i}>{x.message}</li>]
            })

            return store
        }

        return <center>{data[0].message}</center>
    }

    return (
        <form onSubmit={handleSubmit}>

            {
                status && 
                <div className='error_response_box'>
                    <ul>{handleErrorResponse(status)}</ul>
                </div>
            }

            <Grid>
                <SquareInput
                    type="text"
                    name="id"
                    label='ID Pengunjung'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                    error={errors.id && touched.id && errors.id}
                />
                <SquareInput
                    type="text"
                    name="suhu_keluar"
                    label='Suhu Saat Keluar'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.suhu_keluar}
                    error={errors.suhu_keluar && touched.suhu_keluar && errors.suhu_keluar}
                />
            </Grid>


            <Button set='primary' size='jumbo' type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
                Submit
            </Button>
        </form>
    );
};

  
const InputSuhuForm = formikEnhancer(InputSuhuKeluar);

export default InputSuhuForm

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: .5rem;
`