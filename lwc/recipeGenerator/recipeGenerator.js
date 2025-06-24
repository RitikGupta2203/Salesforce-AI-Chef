import { LightningElement } from 'lwc';
import generateAIRecipe from '@salesforce/apex/AIRecipeController.generateAIRecipe';

export default class RecipeGenerator extends LightningElement {

    formData={}
    recipes =[]
    isGenerating= false;
    error =''
    async generateRecipes(event){
        this.error = ''
        this.formData= event.detail.formData

        console.log(JSON.stringify(this.formData))

        // console.log("ingredients", this.formData.ingredients);
        this.isGenerating= true
        try{
            const result = await generateAIRecipe({
            ingredients: this.formData.ingredients, 
            dietaryRestrictions:this.formData.dietaryRestrictions, 
            mealType: this.formData.mealType, 
            servings:this.formData.servings
        });
        console.log("typeof result", typeof result);
        console.log("result", result);
        this.formateResponse(result)

        }catch(error){
            console.log("Error generating Recipes", error);
            this.error = error?.body?.message || error?.message || 'An unexpected error occurred';

        }
        finally{
            this.isGenerating=false;
        }
    }

        formateResponse(result){
            const correctJson = result.replace(/[\n\r\u00A0]/g, '').trim();
            const parsedResponse = JSON.parse(correctJson);

            if(parsedResponse?.recipes?.length>0){
                this.recipes = parsedResponse.recipes.map(recipe =>{
                    if(!recipe.tags){
                        recipe.tags =[]
                    }
                    if(!recipe.total_time){
                        const prepTime = parseInt(recipe.prep_time)||0;
                        const cookTime = parseInt(recipe.cook_time)||0;
                        recipe.total_time = `${prepTime +cookTime} min`;
                    }
                    return recipe
                })
            }
            else{
                this.error ='No Recipes were generated. Try again with different inputs'
                this.recipes= [];
            }
        }

}