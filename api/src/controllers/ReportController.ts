
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/isAuth";
import format from "date-fns/format";

import PdfPrinter from 'pdfmake';
import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import { text } from "body-parser";
import ListTransacaoByDataService from "../services/TransacaoServices/ListTransacaoByData";


interface SerializedCategoria {
    titulo: string;
}

interface SerializedTransacao { // isso aqui pode ser um DTO
    tipo: string;
    categoriaId: string;
    observacao: string;
    valor: number;
    data?: string;
}

export const printReport = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const transacoes = await ListTransacaoByDataService(userId, startDate, endDate);

    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
    }

    const printer = new PdfPrinter(fonts);

    const body: any = [];

    const columnsTitle: TableCell[] = [
        { text: 'Data', style: 'columnsTitle' },
        { text: 'Tipo', style: 'columnsTitle' },
        { text: 'Categoria', style: 'columnsTitle' },
        { text: 'Observação', style: 'columnsTitle' },
        { text: 'Valor', style: 'columnsTitle' },
    ];

    const columnsBody = new Array();
    columnsTitle.forEach((column) => columnsBody.push(column));
    body.push(columnsBody);

    let totalReceita: number = 0.0;
    let totalDespesa: number = 0.0;
    for await (let transacao of transacoes) {
        const dateFormat = format(new Date(transacao.data), 'dd/MM/yyyy');
        const valorStyle = transacao.tipo === 'Despesa' ? 'despesaValue' : 'tableCell';
        const valorTransacao = transacao.tipo === 'Despesa' ? `R$ -${transacao.valor}` : `R$ ${transacao.valor}`
        
        if(transacao.tipo === 'Despesa') {
            totalDespesa += Number(transacao.valor);
        }

        if(transacao.tipo === 'Receita') {
            totalReceita += Number(transacao.valor);
        }

        const rows: TableCell[] = [
            { text: dateFormat, style: 'tableCell' },
            { text: transacao.tipo, style: 'tableCell' },
            { text: transacao.categoria.titulo, style: 'tableCell' },
            { text: transacao.observacao, style: 'tableCell' },
            { text: valorTransacao, style: valorStyle },
        ];
        body.push(rows);
    }

    const diferenca: number = totalReceita - totalDespesa;

    const totalBody: TableCell[] = [
        { text: 'Totais:', style: 'tableCell' },
        { text: `Receita: R$ ${totalReceita.toFixed(2)}`, style: 'tableCell' },
        { text: `Despesa: R$ -${totalDespesa.toFixed(2)}`, style: 'despesaValue' },
        { text: `Diferença: R$ ${diferenca.toFixed(2)}`, style: 'tableCell' },
    ];


    const docDefinition: TDocumentDefinitions = {
        defaultStyle: { font: "Helvetica" },
        content: [
            {
                text: "Relatório de Receitas e Despesas",
                style: 'header'
            },
            {
                table: {
                    widths: ['auto', '*', 100, 190, 'auto'],
                    body
                },
            },
            {
                margin: [0, 10, 0, 0],
                table: {
                    widths: ['*', 'auto', 'auto', 'auto'],
                    body: [totalBody]
                },
                layout: { fillColor: '#DDDDDD' }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 5, 0, 10],
                alignment: 'center'
            },
            columnsTitle: {
                fontSize: 12,
                bold: true,
                fillColor: '#3376FF',
                color: '#FFF',
                alignment: 'center',
                margin: [0, 5],
            },
            tableCell: {
                margin: [0, 2],
            },
            despesaValue: {
                margin: [0, 2],
                color: 'red'
            }
        }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const chunks: any = [];
    pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
    })

    pdfDoc.end();
    pdfDoc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        return res.end(pdfBuffer);
    })
}

