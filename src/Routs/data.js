// import { AppState } from "../contaxt/AppProvider"
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export const Data =[
    {
        "model":"Standard",
        "img":"https://bd.gaadicdn.com/upload/userfiles/images/60408e0113687.jpg",
        "val":"standard"
    },
    {
        "model":"Sport",
        "img":"https://media.zigcdn.com/media/content/2022/Mar/1240468636-yzfr3_720x540.jpg",
        "val":"sport"
    },
    {
        "model":"Touring",
        "img":"https://www.xbhp.com/wp-content/uploads/2015/11/01-770x533.jpg",
        "val":"tour"
    }
]

export const cardData = [
    {
        "value":0,
        "name":"None",
        "point1":"collsion Damage Walver",
        "point2":"Supplimental Liablity Production",
        "point3":"Personal Accident Insurance",
        "point4":"Personal Effects Coverage",
        "opa1":false,
        "opa2":false
    },
    {
        "value":50,
        "name":"Basic",
        "point1":"collsion Damage Walver",
        "point2":"Supplimental Liablity Production",
        "point3":"Personal Accident Insurance",
        "point4":"Personal Effects Coverage",
        "opa1":false,
        "opa2":true
    },
    {
        "value":200,
        "name":"Premium",
        "point1":"collsion Damage Walver",
        "point2":"Supplimental Liablity Production",
        "point3":"Personal Accident Insurance",
        "point4":"Personal Effects Coverage",
        "opa1":true,
        "opa2":true
    }

]

export const EmailSendValue = async(data) =>{
    let params = {
        to_name: data.name,
        message: data.value,
        from_email: data.email
      }
      emailjs.send("service_a3t2n7t", "template_jlc4tr6", params, 'XvuttI8guIGVDozXe').then()
      toast.success("Your OTP is Sent in Email Successfully!!!")
    }