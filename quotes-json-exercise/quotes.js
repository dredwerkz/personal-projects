import { promises as fs, write } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.resolve(process.cwd(), "quotes.json");
///// PARSE JSON FILE AND MAKE ARRAY FUNCTION /////////////////////////////////////////////////
export async function createArrayOfQuotes() {
    const JSONQuotesList = await fs.readFile(filePath, "utf8");

    if (!JSONQuotesList) {
        return [];
    }

    const arrayOfQuotes = JSON.parse(JSONQuotesList);

    return arrayOfQuotes;
}
///// WRITE NEW ARRAY OF QUOTES TO JSON FUNCTION ////////////////////////////////////////////
export async function writeNewQuotesToFile(array) {
    const JSONPayload = JSON.stringify(array);
    await fs.writeFile(filePath, JSONPayload);

    console.log("Quotes written to file.");
}
///// ADD QUOTE FUNCTION //////////////////////////////////////////////////////////////////////////
export async function addQuote(quoteText, author = "Unknown") {
    const newQuoteObject = {
        id: uuidv4(),
        quoteText: quoteText,
        author: author,
    };
    const arrayOfQuotes = await createArrayOfQuotes();

    arrayOfQuotes.push(newQuoteObject);
    await writeNewQuotesToFile(arrayOfQuotes);

    return newQuoteObject;
}
///// GET ALL QUOTES FUNCTION /////////////////////////////////////////////////////////////////////
// Uncomment below to add quote to json file
// await addQuote("Test Quote", "Jon Kelly");
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function getQuotes() {
    // Only exists to pass test script, just use createArrayOfQuotes instead
    return createArrayOfQuotes();
}
///// GET QUOTE BY ID FUNCTION ////////////////////////////////////////////////////////////////////
export async function getQuote(id) {
    const arrayOfQuotes = await createArrayOfQuotes();
    const foundQuote = await arrayOfQuotes.find((quotes) => quotes.id == id);

    if (foundQuote != null) {
        return foundQuote;
    }

    return null;
}
///// EDIT QUOTE FUNCTION //////////////////////////////////////////////////////////////////////////
export async function editQuote(id, newQuoteText, newAuthor) {
    const arrayOfQuotes = await createArrayOfQuotes();
    const foundQuote = await getQuote(id);

    if (!foundQuote) {
        return null;
    }

    foundQuote.quoteText = newQuoteText;
    foundQuote.author = newAuthor;

    const updatedArrayOfQuotes = arrayOfQuotes.map((quotes) => {
        return quotes.id === foundQuote.id ? foundQuote : quotes;
    });

    await writeNewQuotesToFile(updatedArrayOfQuotes);
    return foundQuote;
}
///// DELETE QUOTE FUNCTION ///////////////////////////////////////////////////////////////////////
export async function deleteQuote(id) {
    const arrayOfQuotes = await createArrayOfQuotes();
    const foundQuote = await getQuote(id);

    if (!foundQuote) {
        return false;
    }

    const indexOfQuoteToDelete = arrayOfQuotes.findIndex(
        (quotes) => quotes.id === foundQuote.id
    );

    if (indexOfQuoteToDelete === -1) {
        return false;
    }

    arrayOfQuotes.splice(indexOfQuoteToDelete, 1);
    
    await writeNewQuotesToFile(arrayOfQuotes);
    return true;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////

