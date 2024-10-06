import {defineField, defineType} from 'sanity'
import {AiOutlineFacebook, AiFillTwitterSquare, AiOutlineYoutube} from 'react-icons/ai'
import {BsInstagram} from 'react-icons/bs'
import {FaVimeoSquare} from 'react-icons/fa'

export default defineType({
  name: `socialLink`,
  title: `Social link`,
  type: `object`,
  fields: [
    defineField({
      name: `type`,
      title: `Type`,
      type: `string`,
      options: {
        list: [
          {title: `Facebook`, value: `facebook`},
          {title: `Instagram`, value: `instagram`},
          {title: `Twitter`, value: `twitter`},
          {title: `Vimeo`, value: `vimeo`},
          {title: `Youtube`, value: `youtube`},
          // ...
        ],
        layout: `dropdown`,
      },
    }),
    defineField({
      name: `url`,
      title: `URL`,
      type: `url`,
    }),
  ],
  preview: {
    select: {
      type: `type`,
    },
    prepare: ({type}) => {
      let title = ``
      let Icon

      switch (type) {
        case `facebook`:
          title = `Facebook`
          Icon = AiOutlineFacebook
          break

        case `instagram`:
          title = `Instagram`
          Icon = BsInstagram
          break

        case `twitter`:
          title = `Twitter`
          Icon = AiFillTwitterSquare
          break

        case `vimeo`:
          title = `Vimeo`
          Icon = FaVimeoSquare
          break

        case `youtube`:
          title = `Youtube`
          Icon = AiOutlineYoutube
          break

        default:
          break
      }
      return {
        title,
        media: Icon,
      }
    },
  },
})
