// deposit some money
// determine number of lines to bet on
// collect the bet amount
// spin the slot machine
// check for a win
// give the user their winnings
// play again or cash out

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

// in each col
const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOLS_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit = () =>
{
    while(true)
    {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0)
        {
            console.log("Invalid deposit amount. Please enter a valid amount.");
        }
        else
        {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () =>
{
    while(true)
    {
        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3)
        {
            console.log("Invalid number of lines. Please enter a valid number.");
        }
        else
        {
            return numberOfLines;
        }
    }
}

const getBet = (balance,lines) =>
{
    while(true)
    {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines)
        {
            console.log("Invalid bet. Please enter a valid number.");
        }
        else
        {
            return numberBet;
        }
    }
}

const spin = () =>
{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT))
    {
        for (let i = 0; i < count; i++)
        {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i = 0; i<COLS; i++)
    {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0;j<ROWS;j++)
        {   const randomIndex = Math.floor(Math.random()*reelSymbols.length); //random number bw 0-1
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;
};
const transpose = (reels) =>
{
    const rows = [];

    for(let i = 0;i<ROWS;i++)
    {
        rows.push([]);
        for(let j=0;j<COLS;j++)
        {
            rows[i].push(reels[j][i]) //transposing the reels
        }
    }
    return rows;
};

const printRows = (rows) =>
{
   for(const row of rows)
   {
    let rowstring = "";
    for(const [i,symbol] of row.entries())
    {
        rowstring += symbol;
        if(i != row.length - 1)
        {
            rowstring+=" | ";
        }  
    }
    console.log(rowstring);
   }
};
const getWinnings = (rows , bet , lines) =>
{
    let winnings = 0;
    for(let row = 0; row<lines; row++)
    {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols)
        {
            if(symbol != symbols[0])
            {
                allSame = false;
                break;
            }
        }

        if(allSame)
        {
            winnings += bet*SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = () =>
{
    let balance = deposit();
    
    while(true)
    {
        // prompt("Welcome to the slot machine game!") can print cuz of library console.log is default
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance,numberOfLines);
        balance -=bet*numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines);
        balance +=winnings;
        console.log(`You won $ ${winnings}`); //console.log("You won, $" + winnings.toString());

        if (balance<=0)
        {
            console.log("You have no money left. Game over!");
            break
        }
        const playAgain = prompt("Do you want to play again? (y/n): ");
        
        if(playAgain != "y") break;
    }
}

game();


