const cds = require('@sap/cds')
const { Books } = cds.entities ('sap.capire.bookshop')
class CatalogService extends cds.ApplicationService { async init(){

  const alert = await cds.connect.to('notifications');

  // Reduce stock of ordered books if available stock suffices
  this.on ('submitOrder', async req => {
    const {book,quantity} = req.data
    let {stock} = await SELECT `stock` .from (Books,book)
    if (stock >= quantity) {
      await UPDATE (Books,book) .with (`stock -=`, quantity)
      await this.emit ('OrderedBook', { book, quantity, buyer:req.user.id })
      return { stock }
    }
    else return req.error (409,`${quantity} exceeds stock for book #${book}`)
  })

  // Add some discount for overstocked books
  this.after ('READ','ListOfBooks', async each => {
    if (each.stock > 111) each.title += ` -- 11% discount!`
    let line = each[0]
    // console.log('~~~~~~~~~~~~~~~~~~~~')
    // console.log(line.ID)
    // console.log('~~~~~~~~~~~~~~~~~~~~')
    
    await alert.notify ('ListOfBooksRead', {
          recipients: [ "test1@sap.com", "test2@sap.com" ],
          data: {
            "ID": line.ID,
            "user": cds.context.user.id,
            "title": line.title,
            "stock": line.stock
          }
    })
    
    
  })

  return super.init()
}}

module.exports = { CatalogService }
