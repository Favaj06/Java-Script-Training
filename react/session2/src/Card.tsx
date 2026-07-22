/*import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
*/
// ReactNode represents anything React can render, such as text, numbers,
// JSX elements, fragments, arrays, or other components.
// It is the correct type for children because children can contain any valid React content.

//task 4.2:
import type { ReactNode } from "react";

interface CardProps {
  title: string;
  children?: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>

      {children && <div className="card-body">{children}</div>}
    </div>
  );
}

export default Card;

// A required children prop means content must always be passed to the component.
// An optional children prop allows the component to be used with or without content.
// Use required children when content is essential, and optional children when
// the component should also work as an empty container or placeholder.