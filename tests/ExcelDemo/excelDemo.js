const ExcelJs = require('exceljs');

async function excelprint(){
const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile("D:\\Tutorials\\PlaywrightJS\\exceltest.xlsx");
const worksheet = workbook.getWorksheet('Sheet1');
worksheet.eachRow( (row, rowNumber) => {
    console.log("Row Number" + rowNumber);
    row.eachCell( (cell, colNumber) => {
        console.log(cell.value);
    })

})
}

async function updatecellinexcel(newText){
    excelrange = {irow: -1, icol :-1};
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("D:\\Tutorials\\PlaywrightJS\\exceltest.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow( (row, rowNumber) => {
        row.eachCell( (cell, colNumber) => {
            if(cell.value == "Banana"){
                excelrange.irow = rowNumber;
                excelrange.icol = colNumber;
            }
        })
    
    })
    worksheet.getCell(excelrange.irow, excelrange.icol).value = newText;
    await workbook.xlsx.writeFile("D:\\Tutorials\\PlaywrightJS\\exceltest.xlsx");
    }




