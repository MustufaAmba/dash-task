import React, { useEffect, useState } from 'react'
import styles from "../Styles/Home.module.css"
import bgImage from "../barChart.png"
import {useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        number: "",
        checkTerms: false
    })
const [errors,setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    number:false,
    form:false
})
useEffect(()=>{
    setErrors({...errors,form:false})
},[formData])
    const checkValidations = (event) => {
        if (event.target.id === "email") {
            setFormData({ ...formData, email: event.target.value })
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(regex.test(formData.email))
            {
                setErrors({...errors,email:false})
            }
            else{
                setErrors({...errors,email:true})
            }
        }
        else if (event.target.id === "password") {
            setFormData({ ...formData, password: event.target.value })
            let regex = /^\w{7,15}$/
            if(regex.test(formData.password))
            {
                setErrors({...errors,password:false})
            }
            else{
                setErrors({...errors,password:true})
            }
        }
        else if (event.target.id === "confirmPassword") {
            setFormData({ ...formData, confirmPassword: event.target.value })
  
            if(formData.password===event.target.value)
            {
                setErrors({...errors,confirmPassword:false})
            }
            else{
                setErrors({...errors,confirmPassword:true})
            }
        }

        else if (event.target.id === "number") {
            setFormData({ ...formData, number: event.target.value })
            let regex = /^\d{9}$/
            if(regex.test(formData.number))
            {
                setErrors({...errors,number:false})
            }
            else{
                setErrors({...errors,number:true})
            }
        }
    }
    const handleSubmit = ()=>{
        let {email,password,confirmPassword,name,number,checkTerms}=formData
        if(email.length===0||password.length===0||confirmPassword.length===0||name.length===0||number.length===0||checkTerms===false)
        {
            setErrors({...errors,form:true})
        }
        else{
            setFormData({   email: "",
            password: "",
            confirmPassword: "",
            name: "",
            number: "",
            checkTerms: false})
            navigate("/barChart")
        }
    }
    return (
        <div className={styles.Home}>
            <div className={styles.Home__background}>
                <img src={bgImage} height="60%" width="90%" alt="bg-chart" />
                <h1 className={styles.Home__background__title}>Choose a date range</h1>
                <p className={styles.Home__background__text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At accusantium, iste cum sed natus</p>
            </div>
            <div className={styles.Home__form}>
                <h1 className={styles.Home__form__text}>Create an account</h1>
                <form className={styles.Form}>
                    <div className={styles.Input}>
                        <label className={styles.Input__label} htmlFor='email'>Your email address</label>
                        <input type="email" id="email" className={`${!errors.email&&styles.Input__fieldsMargin} ${styles.Input__fields}`} value={formData.email} onChange={e => checkValidations(e)} />
                        {errors.email&&<div className={styles.Input__error}>Email should be in correct format</div>}
                    </div>
                    <div className={styles.Input}>
                        <label className={styles.Input__label} htmlFor='password'>Your password</label>
                        <input type="password" id="password" className={`${!errors.password&&styles.Input__fieldsMargin} ${styles.Input__fields}`} value={formData.password} onChange={e => checkValidations(e)} />
                        {errors.password&&<div className={styles.Input__error}>Password should be 8 character long</div>}
                    </div>
                    <div className={styles.Input}>
                        <label className={styles.Input__label} htmlFor='confirmPassword'>Confirm your password </label>
                        <input type="password" id="confirmPassword" className={`${!errors.confirmPassword&&styles.Input__fieldsMargin} ${styles.Input__fields}`} value={formData.confirmPassword} onChange={e => checkValidations(e)} />
                        {errors.confirmPassword&&<div className={styles.Input__error}>Password not matched please enter correct password</div>}
                    </div>
                    <div className={styles.Input}>
                        <label className={styles.Input__label} htmlFor='name'>Your full name </label>
                        <input type="text" id="name" className={`${styles.Input__fields} ${styles.Input__fieldsMargin}`} value={formData.name} onChange={e => setFormData({...formData,name:e.target.value})} />
              
                    </div>
                    <div className={styles.Input}>
                        <label className={styles.Input__label} htmlFor='number'>Your phone number </label>
                        <input type="number" id="number" className={`${!errors.number&&styles.Input__fieldsMargin}  ${styles.Input__fields} ${styles.number}`} value={formData.number} onChange={e => checkValidations(e)} />
                        {errors.number&&<div className={`${styles.Input__error} ${styles.number}`}>Number should be 10 digits long</div>}

                    </div>
                    <div className={styles.CheckBox}>
                        <input type="checkbox" id={styles.checkTerms} name="checkTerms" value={formData.checkTerms} onChange={e => setFormData({ ...formData, checkTerms: e.target.value })} />
                        <label htmlFor="checkTerms" className={styles.Checkbox__text}> I read and agree Terms and Conditions</label>
                    </div>
                    <button className={styles.Form__button} type="button" onClick={handleSubmit} >Create account</button>
                </form>
                {errors.form&&<div className={styles.Form__error}>Please fill the form</div>}
            </div>
        </div>
    )
}

export default Home