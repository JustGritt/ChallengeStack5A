import * as React from "react"
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        default: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
        secondary: "text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
        link: "text-blue-700 hover:text-blue-800 focus:outline-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:ring-blue-800",
        delete: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mt-2"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { asChild?: boolean }

function Button({ intent, size, className, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp className={cn(buttonVariants({ intent, size, className }))} {...props} />
  )
}

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, intent, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : "button"
//     return (
//       <Comp className={cn(buttonVariants({ intent, fullWidth, size, className }))} ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Button.displayName = "Button"

export { Button, buttonVariants }