import { useMemo } from "react"
import { ClassValue } from "../types"

const bemify = (block?: string) => {
  // Return a closure
  return (element?: string, ...classes: ClassValue[]) => {
    // Combine the block and element or return the block itself
    const combined = element ? `${block}__${element}` : block

    const formedClasses =
      classes && classes.length
        ? classes
            .map((c: ClassValue) => {
              if (!c) return ""

              // Initialize the base classname
              let className = c

              // Check if c is a conditional array
              if (className && Array.isArray(className)) {
                const [condition, activeClass, fallbackClass] = className

                if (condition) {
                  className =
                    activeClass ||
                    (typeof condition === "string" ? condition : "")
                } else {
                  className =
                    fallbackClass ||
                    (typeof fallbackClass === "string" ? fallbackClass : "")
                }
              }

              // Ensure that classname is always a string
              if (typeof className !== "string") className = ""

              // Finally Check for a modifier class
              if (className.startsWith("--")) className = combined + className

              return className
            })
            .filter((c) => !!c)
        : []

    // Join the classes into a big array and then combine them
    return [combined, ...formedClasses].join(" ")
  }
}

// Let's make a hook that makes this easier to use. We can wrap it in a useMemo so we don't have to waste resources by instantiating it on every render
export default (block?: string) => useMemo(() => bemify(block), [block])

/*
  This is a helpful utility function that makes class concatenation in react easier

  Calling the bemify function returns a function with the Block value accessible via closures

  const bem = bemify("card") // This creates a function that can be called so we don't have to retype the base name
  The first param this new bem function takes is the element name and all other argumrnts are classes to be concatenated

  1. Pass no params and get just the block name
  bem()
    => "card"

  2. Pass a single argument and get the block + element
  bem("photo")
    => "card__photo"

  3. Pass a second argument to be concatenated
  bem("button", "disabled")
    => "card__button disabled"

  4. Pass as many classes as you want
  bem("button", "rounded", "outlined", "disabled")
    => "card__button rounded outlined disabled"

  5. We can also conditinally add classes. Instead of passing a string, just pass an array. The first value is the condition, the next value is the class you want to apply if the condition is met. The third and final value is the class to be applied if the condition is not met which is an optional parameter.
    - Example A
        bem("button", [condition, "disabled"])
          if (condition) => "card__button disabled"
          if (!condition) => "card__button"
    - Example B
        bem("text", [condition, "align-left", "align-right"])
          if (condition) => "card__text align-left"
          if (!condition) => "card__text align-right"

  6. We can have multiple conditional values as well
  bem("button", [isPrimary, "primary"], [!isValid, "disabled"])
    (assume isPrimary = true, isValid = false) => "card__button primary disabled"

*/
