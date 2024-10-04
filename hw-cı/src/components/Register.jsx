import { useEffect, useState } from "react";
import {Form,FormGroup,Label,Input,FormText,Button, Card, CardBody, CardHeader, FormFeedback, CardFooter} from "reactstrap";
import axios from "axios";
const initialValues = {
    ad: "",
    soyad: "",
    email: "",
    password: "",
}
export const errorMesages = {
    ad: "Adınızı en az 3 karakter girirniz",
    soyad: "Soyadınızı en az 3 karakter girirniz",
    email: "Geçerli bir email adresi giriniz",
    password: "En az 8 karakter,en az 1 rakam, 1 büyük harf, 1 küçük harf, sembol ve rakam içermelidir",
}

export default function Register() {
   
    const [formData,setFormData] = useState(initialValues);
    const [errors,setErros] = useState({
        ad: false,
        soyad: false,
        email: false,
        password: false,
    })
    const [isValid, setIsValid] = useState(false);
    const [id,setId] = useState("")

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    let regex = /^(?=.*[az])(?=.*[AZ])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    useEffect (()=>{
        if(formData.ad.trim().length >= 3 && 
        formData.soyad.trim().length >= 3 &&
        validateEmail(formData.email) &&
        regex.test[formData.password]){
            setIsValid(true);
        }else {
            setIsValid(false);
        }
    },[formData])

    const handleChange = (event)=> {
        const {name,value} = event.target;
        setFormData({...formData, [name]: value})
        if (name==="ad" || name==="soyad" ) {
            if(value.trim().length >= 3){
                setErros({...errors, [name]: false});
            }else{
                setErros({...errors, [name]: true});
            }
        }
        if (name==="email"){
            if(validateEmail(value)) {
                setErros({...errors, [name]: false});
            } else {
                setErros({...errors, [name]: true});
            }
        }
        if (name==="password"){
            if(regex.test(value)){
                setErros({...errors, [name]: false});
            } else {
                setErros({...errors, [name]: true});
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!isValid) return;
        axios.post("https://reqres.in/api/users", formData)
        .then(response => {
            setId(response.data.id)
            setFormData(initialValues)
        })
        .catch(error=>console.warn(error))
    }

    return (
    <Card>
        <CardHeader>
            Kayıt ol
        </CardHeader>
            <CardBody>     
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="ad">
                        Ad:
                        </Label>
                        <Input
                        id="ad"
                        name="ad"
                        placeholder="Adınızı Giriniz"
                        type="text"
                        onChange={handleChange}
                        value={formData.ad}
                        invalid={errors.ad}
                        data-cy="ad-input"
                        />
                        {errors.ad && <FormFeedback data-cy="error-message">{errorMesages.ad}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="soyad">
                        Soyad:
                        </Label>
                        <Input
                        id="soyad"
                        name="soyad"
                        placeholder="Soyadınızı Giriniz"
                        type="text"
                        onChange={handleChange}
                        value={formData.soyad}
                        invalid={errors.soyad}
                        data-cy="soyad-input"
                        />
                        {errors.soyad && <FormFeedback data-cy="error-message">{errorMesages.soyad}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                        Email:
                        </Label>
                        <Input
                        id="email"
                        name="email"
                        placeholder="Mailinizi Giriniz"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        invalid={errors.email}
                        data-cy="email-input"
                        />
                        {errors.email && <FormFeedback data-cy="error-message">{errorMesages.email}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">
                        Password:
                        </Label>
                        <Input
                        id="password"
                        name="password"
                        placeholder="Güçlü bir password seçiniz"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        invalid={errors.password}
                        data-cy="password-input"
                        />
                        {errors.password && <FormFeedback data-cy="error-message">{errorMesages.password}</FormFeedback>}
                    </FormGroup>

                    <Button disabled={!isValid} data-cy="submit-button">
                        Kayıt Ol
                    </Button>
                </Form>
            </CardBody>   
            <CardFooter>
                ID:{id}
            </CardFooter>
    </Card>
    );
}