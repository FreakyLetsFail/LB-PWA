import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';


export const metadata = {
    title: "LetsBummel",
    description: "Run | Drink | Share "
}

const RootLayout = ({children}) => {
  return (
    <html lang ="de">
        <body>
          <Provider>
            <div className="main"></div>
                <div className="gradient"></div>

                <main className="app">
                  <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;