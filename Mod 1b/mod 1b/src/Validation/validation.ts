export default function validate(postcode: string, date: Date){
    const today = new Date()

    if(postcode.length<=5){
        return false
    }

    if(date.getMonth()+1 >= today.getMonth()+1){
        return false
    }

    return true
}