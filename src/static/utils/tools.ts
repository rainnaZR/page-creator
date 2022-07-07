const onCompile = (content?: string) => {
  if(!content) return
  let result = content?.trim()?.match(/<.*?\/>/g)

  return result?.map((i: any) => {
    i = i?.replace('<', '')?.replace('/>', '')?.trim()?.split(' ')
    if(!i || !i.length) return

    const data = {
      type: i[0]
    }
    i?.slice(1)?.forEach((m: any) => {
      if(!m) return
      m = m.split('=')
      data[m[0]] = m[1] || true
    })
    return data
  })
}

export default {
  onCompile
}