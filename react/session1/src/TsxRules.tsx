function TsxRules() {
  return (
    <div>
      {/* Fixed: input is a self-closing tag in TSX */}
      <input type="text" />

      {/* Fixed: use className instead of class in TSX */}
      <p className="highlight">Styled paragraph</p>

      {/* Fixed: use htmlFor instead of for because "for" is a reserved JavaScript keyword */}
      <label htmlFor="email">Email</label>

      {/* Fixed: input must be self-closing */}
      <input id="email" type="email" />

      {/* Fixed: style must be an object with camelCase property names */}
      <p style={{ color: "red", fontSize: "16px" }}>
        Red text
      </p>

      {/* Fixed: TSX comments use curly braces with slash-star syntax */}
      {/* This is a comment */}
    </div>
  )
}

export default TsxRules