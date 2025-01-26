import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export default function ClaudeRecipe(props) {
    return (
        <section>
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                <ReactMarkdown children={props.recipe} remarkPlugins={[remarkGfm]}/>
            </article>
        </section>
    )
}