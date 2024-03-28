import puppeteer from "puppeteer";

const launch = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://term.ooo');
  return { page, browser };
}

const activateGame = async (page) => {
  await page.click('#help > div:nth-child(3)')

  await page.keyboard.type('canja');
  await page.keyboard.press('Enter');
}

const getSolutionFromLocalStorage = async (page) => {
  await page.waitForTimeout(3000);

  const localStorage = await page.evaluate(() => JSON.parse(localStorage.getItem("termo")));

  console.log('A palavra de hoje é:', localStorage.state[0].solution.toUpperCase());
}

(async () => {
  try {
    console.log('*** RESOLVENDO O TERMO DO DIA... ***')
    const { page, browser } = await launch();
    await activateGame(page)
    await getSolutionFromLocalStorage(page);

    console.log('Encerrando execução do script!');
    await browser.close()
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
})();