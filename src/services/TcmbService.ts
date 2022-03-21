import axios from 'axios';
import { XMLParser } from "fast-xml-parser";

export interface Currency {
  Unit: number;
  Isim: string;
  CurrencyName: string;
  ForexBuying: number;
  BanknoteBuying: number;
  BanknoteSelling: number;
  CrossRateUSD: number;
  CrossRateOther: number;
}

export type ExchangeRates = Currency[];

class TcmbService {
  async exchangeRates(): Promise<ExchangeRates> {
    const request = await axios.get('https://www.tcmb.gov.tr/kurlar/today.xml');
    const xmlResponse = request.data;
    const xmlParser = new XMLParser();
    const xmlData = xmlParser.parse(xmlResponse);
    const rates = xmlData.Tarih_Date.Currency;

    return rates;
  }
}

export default TcmbService;
