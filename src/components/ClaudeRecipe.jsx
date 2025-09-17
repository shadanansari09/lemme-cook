import Markdown from 'react-markdown'
import "../assets/mainContent.css"

export default function ClaudeRecipe(props){
    return(
        <section className="recipe-section" ref={props.ref}>
            <div >
                <Markdown>{props.recipe}</Markdown>
            </div>
    
</section>
    )
}
