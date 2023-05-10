const moment = require("moment/moment")

const mix = (data) => {
    return data
}

const getDayOfMonth = (data) => {
  return moment(data).format('DD')
}

const getMonth = (data) => {
  let month = moment(data).format('M')
  switch (month){
    case 1:
      return 'JAN'
    case 2:
      return 'FEB'
    case 3:
      return 'MAR'
    case 4:
      return 'APR'
    case 5:
      return 'MAY'
    case 6:
      return 'JUN'
    case 7:
      return 'JUL'
    case 8:
      return 'AUG'
    case 9:
      return 'SEP'
    case 10:
      return 'OCT'
    case 11:
      return 'NOV'
    case 12:
      return 'DEC'
    default:
      return 'JAN'
  }
}

const process_content_article = (block) => {
	let html = ''
	switch (block.type) {
    case 'columns':
      // console.log(block.data.cols[0])
      let col_1_content = ''
      let col_2_content = ''
      for(let item of block.data.cols[0].blocks){
        col_1_content += process_content_article(item)
      }
      for(let item of block.data.cols[1].blocks){
        col_2_content += process_content_article(item)
      }
      let col_1 = `<div class="w-[${block.data.width[0]}%]">${col_1_content}</div>`
      let col_2 = `<div class="w-[${block.data.width[1]}%]">${col_2_content}</div>`
      /* for (let block of block.data.cols[0].blocks){
        console.log(block)
      } */
    /*   for (let block of block.data.cols[1]){
        
      } */
      html = `<div class="flex">${col_1}${col_2}</div>`
      break 
		case 'paragraph':
			let alignmentClass = block.tunes.alignTool.alignment && block.tunes.alignTool.alignment !== '' ? `text-${block.tunes.alignTool.alignment}` : '' 
			html = `<p class="leading-[29px] text-[17px] text-heading mt-[16px] mb-[14px] overflow-hidden  ${alignmentClass} content">${block.data.text}</p>`
			break
		case 'video':
			let url = typeof block.data.hls !== 'undefined' && block.data.hls !== '' ? block.data.hls : block.data.url 
			html = `<div class="w-full aspect-[16/9] mb-3">
			<div class="relative video-wrapper cursor-pointer h-full">
				<video id="${block.id}" class="video w-full h-full" controls playsinline data-poster="${process.env.SERVER_DOMAIN}${block.data.thumbnailUrl}">
					<source src="${process.env.SERVER_DOMAIN}${url}" type="video" />
				</video>
			</div>
		</div>
			<p class="text-center mb-4">${block.data.caption ? block.data.caption : '' }</p>
		`
			break
		case 'image':
			html = `<figure class="mb-4">
			<img src="${process.env.SERVER_DOMAIN}${block.data.url}" class="w-full h-auto mb-2" />
			<figcaption class="mx-auto w-[80%] text-center"><span class="inline-block text-sm italic font-normal">${block.data.caption ? block.data.caption : '' }</span></figcaption>
			</figure>`
			break
		case 'quote':
			html = `<div class="p-4 w-[80%] mx-auto border-2 border-[#F2D1AA] bg-[#FFFBF2] rounded-lg mb-4">
				<p class="italic">${block.data.text}</p>
				<p class="italic font-bold text-right">${block.data.caption ? block.data.caption : '' }</p>
			</div>`
			break
		case 'table':
			let trHtml = block.data.content.map((trItem) => {
				let tdHtml = trItem.map((tdItem) => {
					return `<td class="p-2 border border-gray-200">${tdItem}</td>`
				})
				return `<tr class="px-6">${tdHtml.join('')}</tr>`
			})
			html = `<table class="w-full mb-4">${trHtml.join('')}</table>`
			break
		default:
			break
	}

	return html
}

const process_content_page = (block) => {
	let html

	switch (block.type) {
		case 'header':
			switch (block.data.level) {
				case 2:
					html = `<div class="text-${block.tunes.alignTool.alignment}"><h1 class="font-bold text-2xl mb-4">${block.data.text}</h1></div>`
					break
				case 3:
					html = `<div class="text-${block.tunes.alignTool.alignment}"><h2 class="text-xl mb-4">${block.data.text}</h2></div>`
					break
				case 4:
					html = `<div class="text-${block.tunes.alignTool.alignment}"><h3 class="text-lg mb-2">${block.data.text}</h3></div>`
					break
				case 5:
					html = `<div class="text-${block.tunes.alignTool.alignment}"><h4 class="text-lg mb-2">${block.data.text}</h4></div>`
					break
				default:
					break
			}
			break
		case 'paragraph':
			html = `<div class="text-${block.tunes.alignTool.alignment}"><p class="text-sm mb-4 leading-[1.8]">${block.data.text}</p></div>`
			break
		case 'list':
			let list = block.data.items.map((item) => {
				return `<li class="mb-2 text-sm">${item}</li>`
			})
			list = list.join('')
			html = `<ul class="mb-8">${list}</ul>`

			break
		default:
			break
	}

	return html
}

module.exports = 
	(env) => {
		env.addFilter('mix', mix)
		env.addFilter('getDayOfMonth', getDayOfMonth)
		env.addFilter('getMonth', getMonth)
		env.addFilter('process_content_article', process_content_article)
		env.addFilter('process_content_page', process_content_page)
    }
