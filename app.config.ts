export default defineAppConfig({
    ui: {
        primary: 'teal',
        gray: 'cool',
        slideover:{
          "wrapper": "fixed inset-0 w-1/2 flex z-50",
          "overlay": {
            "base": "fixed inset-0 transition-opacity",
            "background": "bg-gray-200/75 ",
            "transition": {
              "enter": "ease-in-out duration-500",
              "enterFrom": "opacity-0",
              "enterTo": "opacity-100",
              "leave": "ease-in-out duration-500",
              "leaveFrom": "opacity-100",
              "leaveTo": "opacity-0"
            }
          },
          "base": "relative flex-1 flex flex-col w-full focus:outline-none",
          "background": "bg-white ",
          "ring": "",
          "rounded": "",
          "padding": "",
          "shadow": "shadow-xl",
          "width": "w-screen max-w-md",
          "translate": {
            "base": "translate-x-0",
            "left": "-translate-x-full rtl:translate-x-full",
            "right": "translate-x-full rtl:-translate-x-full"
          },
          "transition": {
            "enter": "transform transition ease-in-out duration-300",
            "leave": "transform transition ease-in-out duration-200"
          }
        },
        card:{
            "base": "",
            "background": "bg-white d",
            "divide": "divide-y divide-gray-200 ",
            "ring": "ring-1 ring-gray-200 ",
            "rounded": "rounded-lg",
            "shadow": "shadow",
            "body": {
              "base": "",
              "background": "",
              "padding": "px-4 py-5 sm:p-6"
            },
            "header": {
              "base": "",
              "background": "",
              "padding": "px-4 py-5 sm:px-6"
            },
            "footer": {
              "base": "",
              "background": "",
              "padding": "px-4 py-4 sm:px-6"
            }
          },
          accordion: {
            "wrapper": "w-full flex flex-col",
            "item": {
              "base": " ",
              "size": "text-sm",
              "color": "",
              "padding": "pt-1.5 pb-3",
              "icon": "ms-auto transform transition-transform duration-200"
            },
            "transition": {
              "enterActiveClass": "overflow-hidden transition-[height] duration-200 ease-out",
              "leaveActiveClass": "overflow-hidden transition-[height] duration-200 ease-out"
            },
            "default": {
              "openIcon": "i-heroicons-chevron-down-20-solid",
              "closeIcon": "",
              "class": "mb-1.5 w-full",
              "variant": ""
            }
          }
          
    }
    
  })