export const navLinks = [
  { id: 1, name: "Portfolio" },
  { id: 2, name: "Contact" },
  { id: 3, name: "Project" },
];

// export const location ={
//   work: WORK_LOCATION,
//   about: ABOUT_LOCATION,
//   resume: RESUME_LOCATION,
//   trash: TRASH_LOCATION
// }
export const INTIAL_Z_INDEX = 1000

export const WINDOW_CONFIG ={
  finder: {isOpen: false, zIndex: INTIAL_Z_INDEX,data: null},
  contact: {isOpen: false, zIndex: INTIAL_Z_INDEX,data: null},
  resume: {isOpen: false, zIndex: INTIAL_Z_INDEX,data: null},
  safari: {isOpen: false, zIndex: INTIAL_Z_INDEX,data: null},
  photos: {isOpen: false, zIndex: INTIAL_Z_INDEX,data: null},
}


export const  navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg"
  },
  {
    id: 2,
    img: "/icons/search.svg"
  },
  {
    id: 3,
    img: "/icons/user.svg"
  },
  {
    id: 4,
    img: "/icons/mode.svg"
  },

]


export const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id:1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png"
    },
    {
      id:2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png"
    },
  ]
}



export const WORK_LOCATION ={
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children : [
    {
      id:5,
      name: "Nike Ecommerce Website Application",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[15vh] right-20",
      children: {
        id:1,
        name: "Nike Project.txt",
        icon: "/images/txt.png",
        kind: "file",
        fileType: "text",
        position: "top-5 left-10",
        description: [
          "write  what i want "
        ]
      }
    }
  ]
}