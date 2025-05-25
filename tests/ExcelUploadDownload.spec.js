const {test, expect} = require("@playwright/test");
const ExcelJs = require('exceljs');


test('excel upload download test', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    
    //const downloadevent =  page.waitForEvent('download');
    //await page.getByRole('button',{name:'Download'}).click();
    //await downloadevent;
    await updateitempriceinexcel("Banana", 500);

    //upload excel
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("D:/Tutorials/PlaywrightJS/download.xlsx");

    //verify price on UI
    const rowcount = await page.locator("div[role='table'] div[role='row']").count()-1;
    for(let i=0;i<rowcount;i++){
        if(await page.locator("#div#row-"+i+" div#cell-" +(i+2)+ "-undefined").textContent() == "Banana"){
            console.log(await page.locator("#div#row-"+i+" div#cell-" +(i+4)+ "-undefined").textContent());
            expect(await page.locator("#div#row-"+i+" div#cell-" +(i+4)+ "-undefined").textContent()).toEqual("500");
        }
    }

})



async function updateitempriceinexcel(searchtext, pricevalue){

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("D:\\Tutorials\\PlaywrightJS\\download.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    const cellrange = await getcellcoordinate(worksheet,searchtext);
    worksheet.getCell(cellrange.row, Number(cellrange.column)+2).value = pricevalue;
    await workbook.xlsx.writeFile("D:\\Tutorials\\PlaywrightJS\\download.xlsx");

}

async function getcellcoordinate(worksheet, searchvalue){

    const cellrange = {row : -1, column: -1};
    worksheet.eachRow( (row, rowNumber) => {
        row.eachCell( (cell, colNumber) => {
            if(cell.value == searchvalue){
                cellrange.row = rowNumber;
                cellrange.column = colNumber;
            }
        })
    })
    return cellrange

}