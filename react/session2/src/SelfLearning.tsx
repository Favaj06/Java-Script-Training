import type { ReactNode, ReactElement } from "react";

// React.FC automatically includes the children prop.
// When we type the props directly, we only get the props we define.
// Most developers now prefer typing props directly because it is
// simpler and makes the component easier to understand.

// PropsWithChildren automatically adds an optional children prop
// to the interface. It saves us from writing children?: ReactNode
// every time we create a component that accepts children.

// The key prop is only used by React to identify items in a list.
// It helps React update the UI efficiently when items are added,
// removed, or reordered. Since React handles it internally,
// we cannot access props.key inside the component.

interface PageLayoutProps {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

function PageLayout({ header, children, footer }: PageLayoutProps) {
  return (
    <div>
      <header
        style={{
          background: "#f0f0f0",
          padding: "12px",
        }}
      >
        {header}
      </header>

      <main
        style={{
          padding: "16px",
        }}
      >
        {children}
      </main>

      <footer
        style={{
          background: "#f0f0f0",
          padding: "12px",
        }}
      >
        {footer}
      </footer>
    </div>
  );
}

// Children is the content placed between the opening and closing tags
// of a component. Named props like header and footer are useful when
// a component has multiple fixed sections that need different content.

interface WrapperProps {
  content: ReactNode;
}

function Wrapper({ content }: WrapperProps) {
  return <div>{content}</div>;
}

interface IconButtonProps {
  icon: ReactElement;
  label: string;
}

function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button>
      {icon} {label}
    </button>
  );
}

interface TooltipProps {
  trigger: ReactElement;
  tip: string;
}

function Tooltip({ trigger, tip }: TooltipProps) {
  return <span title={tip}>{trigger}</span>;
}

// ReactNode can represent anything React is able to render,
// such as text, numbers, React elements, arrays, or even null.

// ReactElement accepts only JSX elements or React components.
// It does not allow plain text or numbers.

// JSX.Element is very similar to ReactElement,
// but it does not allow null or undefined values.

function SelfLearning() {
  return (
    <div>
      <PageLayout
        header={<h1>Intern Dashboard</h1>}
        footer={<p>© 2026 Aarvihsolutions</p>}
      >
        <p>Main content goes here as children.</p>
        <p>Any JSX works — text, elements, or other components.</p>
      </PageLayout>

      <hr />

      <Wrapper content="This is a ReactNode string." />

      <Wrapper content={<strong>This is a JSX element.</strong>} />

      <IconButton
        icon={<span>⭐</span>}
        label="Star Button"
      />

      <br />
      <br />

      <Tooltip
        trigger={<button>Hover Me</button>}
        tip="This is a tooltip"
      />

      {/*
      These examples are intentionally incorrect.

      Passing a string to the icon prop causes a TypeScript error
      because the icon prop only accepts a ReactElement.

      <IconButton
        icon="⭐"
        label="Star Button"
      />

      Error:
      Type 'string' is not assignable to type 'ReactElement'.

      Passing null to the trigger prop also causes an error
      because trigger must be a valid JSX.Element.

      <Tooltip
        trigger={null}
        tip="Tooltip"
      />

      Error:
      Type 'null' is not assignable to type 'JSX.Element'.
      */}
    </div>
  );
}

export default SelfLearning;