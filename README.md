`Update On : 2026.03.21`
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Black+Ops+One&size=100&pause=1000&color=ADD8E6&center=true&width=1000&height=200&lines=RAVI-MD-BOT" alt="Typing SVG" /></a>
<div align="center">
	<h3>👧🏻RAVI-MD WHATSAPP BOT👧🏻</h3>
	<img src="https://i.postimg.cc/3wqsBm2d/Whats-App-Image-2026-06-17-at-5-51-24-PM.jpg" alt="Ravi Bot Banner" width="500" style="margin-top: 10px; border-radius: 8px;"/>
</div>
## [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Rockstar-ExtraBold&color=F00&lines=HELLO+IM+RAVI+MD+DEVELOPER)](https://git.io/typing-svg)

<hr>
<img src="https://readme-typing-svg.herokuapp.com?size=33&width=1000&lines=Welcome+To+Ravi-MD...;World+Best+Whatsapp+User+Bot...;Simple+Java+Script+Bot...;Simple+And+Fast+Deploy...;Thank+You+For+Using+Ravi-MD..." alt="Typing">

<hr>

Ravi-MD බොට් යනු WhatsApp සඳහා වන පරිශීලක බොට් එකක් වන අතර එමඟින් ඔබට බොහෝ කාර්යයන් ඉටු කිරීමට ඉඩ සලසයි. මෙය බොට් යන්ත්‍රයක් යෙදවීමට ඔබට ඉඩ සලසන ව්‍යාපෘතියක් පමණි.
       
<h3>🌸 How To Deploy </h3>

<h5>🌸 First tap to Fork button and create new fork</h5>

<h4>🌸 Following 👇</h4>
<hr>	
<h3>🌸 Get Your SESSION ID 👇</h3> 
<br>

*🌸 Now get your inbox and copy session id*

*🌸 If you past session id in (settings.js/SESSION_ID || "past_copy_text")*

<h3>📞 Contact Owner </h3>
<a href="https://wa.me/94768223718">Contact me on WhatsApp: +94 76 822 3718 👧</a>
<hr>

***DEPLOY VIA WORKFLOWS🌸***

<details open>
<summary>🌸 DEPLOY IN FREE 🌸</summary>

<h5>🌸 Deploy Free Workflows 👇</h5>

```yaml
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
