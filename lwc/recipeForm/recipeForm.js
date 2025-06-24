import { LightningElement } from 'lwc';

export default class RecipeForm extends LightningElement {

    formData ={}
    dietaryOptions = [
        { label: 'None', value:'none'},
        { label: 'Vegetarian', value: 'vegetarian'},
         { label: 'Vegan', value: 'vegan'},
          { label: 'Gluteen-Free', value: 'glueteen-free'}
    ]

    mealTypeOptions =[
        {label: 'Breakfast', value:'breakfast'},
        {label: 'Lunch', value:'lunch'},
        {label: 'Dinner', value:'dinner'},
        {label: 'Appetizer', value:'appetizer'}
    ]

    handleChange(e){
        const {name,value} = e.target

        //assign the value in formData object
        this.formData[name] = value
    }

    generateRecipes(){
        this.dispatchEvent(new CustomEvent('generate',{
            detail:{
                formData:this.formData
            }
        }))

    }
}