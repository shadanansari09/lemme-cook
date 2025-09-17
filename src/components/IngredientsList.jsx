import "../assets/mainContent.css"
export default function IngredientsList(props) {

  
  const ingLisItems = props.ingredients.map((ing) => <li key={ing}>{ing}</li>);
  
  return (
    <section className="second-container">

      <h2>Ingredients on hand:</h2>
      <ul>{ingLisItems}</ul>

      {props.ingredients.length > 2 && (
          <div className="recipe-action">
          <div className="recipe-before">
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients</p>
          </div>
          <button onClick={props.recipe} className="btn-get">
            Get a recipe
          </button>
        </div>
      )}
    </section>
  );
}
