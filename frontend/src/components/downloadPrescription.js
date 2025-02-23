import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {symptomOptions} from './data/symptomOptions'
import logo from '../assets/prescription.png'

export const downloadPrescription=(details,selectedSymptoms)=>{
    const doc=new jsPDF()
    // Set Margins
    const margin=15
    const pageWidth=doc.internal.pageSize.width
    const pageHeight=doc.internal.pageSize.height
    // Add Logo
    doc.addImage(logo,'PNG',margin,margin,30,30)
    // Add Title
    doc.setFontSize(18)
    doc.setTextColor(0,86,179) // Blue Color
    doc.setFont('helvetica','bold')
    doc.text('Health Prescription',margin+35,margin+15)
    // Add Subtitle
    doc.setFontSize(10)
    doc.setTextColor(100,100,100) // Gray Color
    doc.text('By Medico - An ML Based Health Assistant',margin+35,margin+22)
    // Add Date and Time
    const date=new Date().toLocaleString()
    doc.setFontSize(9)
    doc.setTextColor(0,0,0) // Black Color
    doc.text(`Generated on: ${date}`,margin,margin+40)
    // Add Predicted Disease
    doc.setFontSize(14)
    doc.setTextColor(0,86,179) // Blue Color
    doc.text(`Predicted Disease: ${details.prediction}`,margin,margin+50)
    // Add Symptoms
    doc.setFontSize(10)
    doc.setTextColor(0,0,0) // Black Color for Symptom Labels
    doc.text('Symptoms:',margin,margin+60)
    // Map Selected Symptom Values to their Labels
    const symptomLabels=selectedSymptoms.map((symptomValue)=>{
        const symptom=symptomOptions.find((option)=>option.value===symptomValue)
        return symptom.label
    })
    // Layout Parameters
    const symptomsPerColumn=4 // Max Symptoms per Column
    const maxColumns=3 // Max Columns per Row
    const columnWidth=60 // Width of each Column
    const startX=margin // Starting X Position for Symptoms
    let startY=margin+70 // Starting Y Position for Symptoms
    symptomLabels.forEach((symptomLabel,index)=>{
        const columnIndex=index%maxColumns // Column Index (0, 1, or 2)
        const rowIndex=Math.floor(index/maxColumns) // Row Index (0, 1, etc.)
        // Calculate X and Y Positions
        const x=startX+columnIndex*columnWidth
        const y=startY+(rowIndex%symptomsPerColumn)*7
        // Add Symptom Label
        doc.text(`- ${symptomLabel}`,x,y)
    })
    // Adjust Y Position after Symptoms
    const symptomsEndY=startY+(Math.ceil(symptomLabels.length/maxColumns)*7)
    // Add Precautions in a Table
    doc.setFontSize(12)
    doc.setTextColor(0,86,179) // Blue Color
    doc.text('Precautions:',margin,symptomsEndY+10)
    doc.autoTable({
        startY: symptomsEndY+15,
        head: [['#','Precaution']],
        body: details.precautions.map((precaution,index)=>[index+1,precaution]),
        theme: 'striped',
        headStyles: {fillColor: [0,86,179]}, // Blue Header
        styles: {fontSize: 9}
    })
    // Add Diet in a Table
    doc.setFontSize(12)
    doc.setTextColor(0,86,179) // Blue Color
    doc.text('Diet:',margin,doc.autoTable.previous.finalY+5)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY+10,
        head: [['#','Diet Item']],
        body: details.diet.map((dietItem,index)=>[index+1,dietItem]),
        theme: 'striped',
        headStyles: {fillColor: [0,86,179]}, // Blue Header
        styles: {fontSize: 9}
    })
    // Add Medications in a Table
    doc.setFontSize(12)
    doc.setTextColor(0,86,179) // Blue Color
    doc.text('Medications:',margin,doc.autoTable.previous.finalY+5)
    doc.autoTable({
        startY: doc.autoTable.previous.finalY+10,
        head: [['#','Medication']],
        body: details.medications.map((medication, index)=>[index+1,medication]),
        theme: 'striped',
        headStyles: {fillColor: [0,86,179]}, // Blue Header
        styles: {fontSize: 9}
    })
    // Add Doctor to Consult
    doc.setFontSize(12)
    doc.setTextColor(0,86,179) // Blue Color
    doc.text('Doctor to Consult:',margin,doc.autoTable.previous.finalY+5)
    doc.setFontSize(10)
    doc.setTextColor(0,0,0) // Black Color
    doc.text(`- ${details.consult}`,margin+5,doc.autoTable.previous.finalY+15)
    // Add Border to the entire Page
    doc.setDrawColor(0,86,179) // Blue Border
    doc.setLineWidth(1)
    doc.rect(margin-5,margin-5,pageWidth-2*margin+10,pageHeight-2*margin+10)
    // Save the PDF
    doc.save('Prescription.pdf')
}