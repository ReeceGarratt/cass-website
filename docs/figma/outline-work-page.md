---
figma_page: Work
page_node_id: "19:104"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=19-104
fetched: 2026-09-29
tools: [get_metadata]
---

# Work page outline

Unedited `get_metadata` output for the whole `Work` page (`19:104`). It holds a `Landing`
frame and the four desktop case studies, plus a mobile case study frame.

The call returns ~94k characters, over the tool's output limit, so it was written to disk
and is reproduced here in full. Notes and the section inventory are in
[`design-system/README.md`](design-system/README.md) and
[`../wiki/componentisation.md`](../wiki/componentisation.md).

## Outline

```xml
<canvas id="19:104" name="Work" x="0" y="0" width="0" height="0">
  <frame id="30:339" name="Landing" x="-3287" y="-3484" width="1920" height="1080">
    <instance id="30:350" name="Navigation" x="0" y="0" width="1920" height="90.07408142089844" />
    <frame id="144:964" name="Frame 1234" x="114" y="269" width="1692" height="633">
      <instance id="144:889" name="Detailed Card" x="0" y="0" width="405" height="633" />
      <instance id="144:927" name="Detailed Card" x="429" y="0" width="405" height="633" />
      <instance id="144:941" name="Detailed Card" x="858" y="0" width="405" height="633" />
      <instance id="144:942" name="Detailed Card" x="1287" y="0" width="405" height="633" />
    </frame>
  </frame>
  <frame id="53:156" name="💻 Case Study 1" x="-3255" y="-1677" width="1920" height="6003">
    <frame id="157:2104" name="Content" x="-0.1962890625" y="0" width="1920.392578125" height="5372.07421875">
      <frame id="88:650" name="Navigation" x="0" y="0" width="1920.392578125" height="170.0740966796875">
        <instance id="88:630" name="Navigation" x="0" y="0" width="1920" height="90.07408142089844" />
        <instance id="144:550" name="Sub Nav" x="0" y="90.07408142089844" width="1920.392578125" height="80.00001525878906" />
      </frame>
      <frame id="86:441" name="Introduction" x="110.6962890625" y="330.0740966796875" width="1699" height="775">
        <rounded-rectangle id="53:200" name="Scoring Page_Updated_anonymised 4" x="915.6962890625" y="330.0740966796875" width="894" height="775" />
        <instance id="144:1656" name="Intro" x="110.6962890625" y="330.0740966796875" width="687" height="762.1836547851562" />
      </frame>
      <frame id="67:334" name="Process" x="0.1962890625" y="1265.0740966796875" width="1920" height="164">
        <text id="67:335" name="identify business needs" x="274.423583984375" y="40" width="133" height="84" />
        <instance id="144:1790" name="Arrow_01" x="439.423583984375" y="69.0864486694336" width="41.83057106746082" height="27.325753050725382" />
        <text id="67:337" name="AS-IS Journey Investigations" x="513.254150390625" y="54" width="210" height="56" />
        <instance id="144:1794" name="Arrow_01" x="755.254150390625" y="69.0864486694336" width="41.83057106746082" height="27.325753050725382" />
        <text id="67:339" name="SME Interviews" x="829.084716796875" y="54" width="150" height="56" />
        <instance id="144:1798" name="Arrow_01" x="1011.084716796875" y="69.0864486694336" width="41.83057106746082" height="27.325753050725382" />
        <text id="67:341" name="User Research" x="1084.915283203125" y="54" width="129" height="56" />
        <instance id="144:1802" name="Arrow_01" x="1245.915283203125" y="69.0864486694336" width="41.83057106746105" height="27.325753050725382" />
        <text id="67:343" name="Design" x="1319.745849609375" y="68" width="97" height="28" />
        <instance id="144:1806" name="Arrow_01" x="1448.745849609375" y="69.0864486694336" width="41.83057106746105" height="27.325753050725382" />
        <text id="67:345" name="UsabilityTesting" x="1522.576416015625" y="54" width="123" height="56" />
      </frame>
      <frame id="86:190" name="Business problem" x="431.791748046875" y="1589.0740966796875" width="1056.80908203125" height="304">
        <instance id="144:1874" name="Business Problem Heading" x="0" y="60" width="391.80908203125" height="184" />
        <frame id="86:196" name="List" x="471.80908203125" y="0" width="585" height="304">
          <text id="144:1881" name="Each business unit operated its own team of specialised Agents, each focused on one or two products." x="0" y="0" width="585" height="47" />
          <instance id="86:198" name="Vertical Divider" x="0" y="95" width="585" height="1" />
          <text id="144:1884" name="Repeated transfers were happening in the call centres and Customers were dropping calls to go to branches." x="0" y="144" width="585" height="42" />
          <instance id="86:200" name="Vertical Divider" x="0" y="234" width="585" height="1" />
          <text id="144:1886" name="Agents had limited cross-selling opportunities." x="0" y="283" width="596" height="21" />
        </frame>
      </frame>
      <frame id="86:211" name="Talking to agents" x="236.1962890625" y="2053.07421875" width="1448" height="448">
        <frame id="86:212" name="Top" x="114" y="80" width="1220" height="93">
          <frame id="86:214" name="Heading" x="0" y="1.5" width="251" height="90">
            <text id="86:216" name="Talking TO the experts" x="0" y="1.5" width="251" height="90" />
          </frame>
          <frame id="86:217" name="Quote" x="491" y="0" width="632" height="93">
            <text id="86:218" name="“" x="0" y="0" width="13" height="39" />
            <text id="86:219" name="Customers always ask ‘how much longer?’ or ‘why do you need to know this?’ because the system asks unnecessary questions and it takes forever" x="29" y="0" width="570" height="93" />
            <text id="86:220" name="”" x="615" y="0" width="17" height="39" />
          </frame>
        </frame>
        <frame id="86:221" name="Details" x="80" y="213" width="1288" height="155">
          <frame id="86:222" name="WHAT" x="34" y="0" width="392" height="165">
            <frame id="86:223" name="List" x="0" y="0" width="392" height="165">
              <frame id="86:224" name="1" x="0" y="0" width="392" height="42">
                <text id="86:225" name="?" x="0" y="7" width="15.03797435760498" height="28" />
                <text id="86:226" name="Spoke to credit SME’s about how scoring works per product." x="31.037975311279297" y="0" width="361" height="42" />
              </frame>
              <frame id="86:227" name="2" x="0" y="66" width="389" height="47">
                <text id="86:228" name="?" x="0" y="9.5" width="12" height="28" />
                <text id="86:229" name="Interviewed Agents who already use the existing platform." x="28" y="0" width="361" height="47" />
              </frame>
              <frame id="86:230" name="3" x="0" y="137" width="305" height="28">
                <text id="86:231" name="?" x="0" y="0" width="12" height="28" />
                <text id="86:232" name="Observed 3 real Customer calls." x="28" y="0" width="277" height="28" />
              </frame>
            </frame>
          </frame>
          <instance id="86:233" name="Horizontal divider" x="490" y="0" width="1" height="156" />
          <frame id="86:234" name="How" x="555" y="0" width="699" height="142">
            <text id="86:235" name="Key learnings" x="0" y="0" width="699" height="22" />
            <frame id="86:236" name="Copy" x="0" y="38" width="699" height="104">
              <text id="86:237" name="Customers get an affordability amount given to them by the bank. Customers come to Agents with problems they need solved rather then products in mind. Customers were frustrated and feel the process takes too long." x="0" y="0" width="699" height="104" />
            </frame>
          </frame>
        </frame>
      </frame>
      <frame id="87:504" name="Design" x="236.1962890625" y="2661.07421875" width="1448" height="1834">
        <frame id="87:505" name="Intro" x="0" y="0" width="1448" height="90">
          <frame id="87:506" name="H1" x="92" y="0" width="300" height="90">
            <text id="87:507" name="designing the Scoring page" x="92" y="0" width="300" height="90" />
          </frame>
          <text id="87:509" name="During the design phase I was prompted to push the traditional boundaries of the Salesforce ecosystem. This prompted me to ensure that I worked closely with a Salesforce Lead Engineer to ensure what I was proposing was possible." x="440" y="9" width="916" height="81" />
        </frame>
        <frame id="87:510" name="Design Work" x="0" y="170" width="1448" height="1664">
          <frame id="87:511" name="P1" x="0" y="0" width="1448" height="281">
            <rounded-rectangle id="87:512" name="Scoring Page_Updated_anonymised 2" x="0" y="0" width="802" height="243" />
            <frame id="87:513" name="Right" x="882" y="0" width="566" height="281">
              <text id="87:515" name="removing the guess work" x="0" y="0" width="566" height="24" />
              <frame id="87:517" name="Detail" x="0" y="48" width="566" height="233">
                <frame id="87:518" name="Problem" x="0.000030517578125" y="0" width="565.9999389648438" height="47">
                  <text id="87:519" name="problem" x="0" y="0" width="60" height="15" />
                  <text id="87:520" name="Agents didn’t know how much Customers qualified for." x="0" y="23" width="565.4323120117188" height="24" />
                </frame>
                <frame id="87:521" name="Design" x="0" y="71" width="566" height="71">
                  <text id="87:522" name="design decision" x="0" y="0" width="566" height="15" />
                  <text id="87:523" name="Created a dynamic affordability indicator to give agents a clear amount to work with." x="0" y="23" width="484" height="48" />
                </frame>
                <frame id="87:524" name="Outciome" x="0" y="166" width="523" height="67">
                  <text id="87:525" name="outcome" x="0" y="0" width="149" height="16" />
                  <text id="87:526" name="Giving the Agent enough information to offer additional products with confidence." x="0" y="24" width="523" height="43" />
                </frame>
              </frame>
            </frame>
          </frame>
          <frame id="87:527" name="P2" x="0" y="377" width="1448" height="391">
            <rounded-rectangle id="87:528" name="Scoring Page_Updated_anonymised 2" x="0" y="0" width="802" height="391" />
            <frame id="87:529" name="Right" x="882" y="0" width="566" height="342">
              <text id="87:531" name="giving the agent control" x="0" y="0" width="492" height="31" />
              <frame id="87:533" name="Detail" x="0" y="55" width="566" height="287">
                <frame id="87:534" name="Problem" x="0" y="0" width="566" height="72">
                  <text id="87:535" name="problem" x="0" y="0" width="119" height="16" />
                  <text id="87:536" name="Agents had to manually keep track of Customers products, monthly repayments and benefits manually." x="0" y="24" width="566" height="48" />
                </frame>
                <frame id="87:537" name="Design" x="0" y="96" width="566" height="95">
                  <text id="87:538" name="solution" x="0" y="0" width="131" height="15" />
                  <text id="87:539" name="A component that gave the Agent the ability to manage multiple credit products and view their benefits at once, with an easy way to see the effects of the amount of credit taken in real time." x="0" y="23" width="566" height="72" />
                </frame>
                <frame id="87:540" name="Outcome" x="0" y="215" width="566" height="72">
                  <text id="87:541" name="outcome" x="0" y="0" width="518" height="16" />
                  <text id="87:542" name="Reduced the time taken to move between products and allowing the Customer to make informed decisions." x="0" y="24" width="566" height="48" />
                </frame>
              </frame>
            </frame>
          </frame>
          <frame id="87:543" name="P3" x="0" y="864" width="1448" height="391">
            <rounded-rectangle id="87:544" name="Scoring Page_Updated_anonymised 2" x="0" y="0" width="802" height="391" />
            <frame id="87:545" name="Right" x="882" y="0" width="566" height="284">
              <text id="87:547" name="a variety of choices" x="0" y="0" width="509" height="26" />
              <frame id="87:549" name="Detail" x="0" y="50" width="566" height="234">
                <frame id="87:550" name="Problem" x="0" y="0" width="566" height="48">
                  <text id="87:551" name="problem" x="0" y="0" width="125" height="16" />
                  <text id="87:552" name="Agents had to guess what products their Customers would qualify for." x="0" y="24" width="566" height="24" />
                </frame>
                <frame id="87:553" name="Design" x="0" y="72" width="566" height="90">
                  <text id="87:554" name="solution" x="0" y="0" width="118" height="16" />
                  <text id="87:555" name="Providing the Agent with a range of products the Customer qualifies for, within their remaining affordability. The products suggested would also be driven by customer data" x="0" y="24" width="566" height="72" />
                </frame>
                <frame id="87:556" name="Outcome" x="0" y="186" width="566" height="48">
                  <text id="87:557" name="Outcome" x="0" y="0" width="131" height="16" />
                  <text id="87:558" name="Increased cross selling opportunities." x="0" y="24" width="566" height="24" />
                </frame>
              </frame>
            </frame>
          </frame>
          <frame id="87:559" name="P4" x="0" y="1351" width="1448" height="313">
            <rounded-rectangle id="87:560" name="Scoring Page_Updated_anonymised 2" x="0" y="0" width="802" height="188" />
            <frame id="87:561" name="Right" x="882" y="0" width="566" height="313">
              <text id="87:563" name="building trust" x="0" y="0" width="509" height="25" />
              <frame id="87:565" name="Detail" x="0" y="49" width="566" height="264">
                <frame id="87:566" name="Problem" x="0" y="0" width="566" height="72">
                  <text id="87:567" name="problem" x="0" y="0" width="125" height="16" />
                  <text id="87:568" name="At this point of the conversation our Customer has said and heard so many numbers they are likely to lose track." x="0" y="24" width="566" height="48" />
                </frame>
                <frame id="87:569" name="Solution" x="0" y="96" width="566" height="72">
                  <text id="87:570" name="solution" x="0" y="0" width="131" height="16" />
                  <text id="87:571" name="I included a product summary that breaks down how much they will be paying monthly and once off." x="0" y="24" width="566" height="48" />
                </frame>
                <frame id="87:572" name="Outcome" x="0" y="192" width="566" height="72">
                  <text id="87:573" name="Outcome" x="0" y="0" width="131" height="16" />
                  <text id="87:574" name="Customers have more realistic expectations at the end of a call without the stress of writing down all the information." x="0" y="24" width="566" height="48" />
                </frame>
              </frame>
            </frame>
          </frame>
        </frame>
      </frame>
      <frame id="19:109" name="Testing" x="234.6962890625" y="4655.07421875" width="1451" height="476">
        <frame id="19:110" name="Content" x="328" y="80" width="795" height="316">
          <text id="88:626" name="14 out of 15" x="-7.5" y="0" width="292" height="163" />
          <frame id="19:114" name="Content" x="332.5" y="0" width="470" height="316">
            <frame id="19:115" name="H1" x="0" y="0" width="470" height="116">
              <text id="19:116" name="Testing my work" x="0" y="0" width="470" height="45" />
              <text id="19:117" name="I collaborated with the Designer that worked on the steps before scoring to test a full journey." x="0" y="69" width="470" height="47" />
            </frame>
            <frame id="19:118" name="Details" x="0" y="140" width="468" height="188.9257049560547">
              <frame id="19:119" name="Note" x="5" y="192.6812286376953" width="417" height="136.2445526123047">
                <instance id="157:2037" name="Arrow_03" x="184.05056762695312" y="33.512451171875" width="48.898881233625616" height="44.839456804119436" />
                <text id="19:123" name="This was a behaviour leftover from some of the existing journeys." x="-0.04799193516373634" y="61.48836898803711" width="417.0959838673007" height="62.64883842098061" />
              </frame>
              <frame id="19:124" name="Description" x="0" y="140" width="468" height="69.93887329101562">
                <text id="19:125" name="Insight" x="0" y="0" width="107" height="16" />
                <text id="19:126" name="Users would look for the ‘Next’ button on the top of the screen instead of at the bottom." x="0" y="24" width="468" height="95" />
              </frame>
            </frame>
          </frame>
        </frame>
      </frame>
      <frame id="19:127" name="Handover" x="0.1962890625" y="5291.07421875" width="1920" height="81">
        <frame id="19:128" name="Final" x="515" y="1" width="890" height="80">
          <text id="19:129" name="handover &amp; next iteration" x="0" y="0" width="303" height="80" />
          <text id="19:130" name="I handed over the tested interface, the usability findings, and a recommendation on the way forward. The next iteration would address the mental-model snag, then retest." x="351" y="4.5" width="552" height="71" />
        </frame>
      </frame>
    </frame>
    <instance id="180:844" name="Read More" x="111" y="5532.07421875" width="1698" height="391" />
  </frame>
  <instance id="144:1046" name="ABSA" x="-3249" y="-1896" width="463" height="141" />
  <instance id="144:1063" name="ABSA" x="-991" y="-1896" width="463" height="141" />
  <frame id="91:669" name="💻 Case Study 2" x="-991" y="-1677" width="1920" height="9337">
    <frame id="91:670" name="Navigation" x="-0.1962890625" y="0" width="1920.392578125" height="170.0740966796875">
      <instance id="91:671" name="Navigation" x="0" y="0" width="1920" height="90.07408142089844" />
      <instance id="144:1085" name="Sub Nav" x="0" y="90.07408142089844" width="1920.392578125" height="80.00001525878906" />
    </frame>
    <frame id="91:685" name="Introduction" x="112.5" y="330.0740966796875" width="1695" height="812">
      <instance id="144:1416" name="Intro" x="0" y="0" width="687" height="756.1836547851562" />
      <rounded-rectangle id="91:1381" name="Import Collections - Product Page - Trade Officer 4" x="805" y="0" width="890" height="812" />
    </frame>
    <frame id="91:701" name="Process" x="0" y="1302.0740966796875" width="1920" height="164">
      <text id="91:702" name="Identify Business Needs" x="243.92356872558594" y="40" width="129" height="84" />
      <instance id="144:1810" name="Arrow_01" x="404.923583984375" y="69.0864486694336" width="41.83057106746094" height="27.325753050725382" />
      <text id="91:704" name="User Research" x="478.754150390625" y="54" width="126" height="56" />
      <instance id="144:1814" name="Arrow_01" x="636.754150390625" y="69.0864486694336" width="41.83057106746094" height="27.325753050725382" />
      <text id="91:706" name="Personas" x="710.584716796875" y="68" width="134" height="28" />
      <instance id="144:1818" name="Arrow_01" x="876.584716796875" y="69.0864486694336" width="41.83057106746095" height="27.325753050725382" />
      <text id="91:708" name="User Journeys" x="950.415283203125" y="54" width="129" height="56" />
      <instance id="144:1822" name="Arrow_01" x="1111.415283203125" y="69.0864486694336" width="41.83057106746094" height="27.325753050725382" />
      <text id="91:710" name="Wireframing &amp; UI Design" x="1185.245849609375" y="54" width="198" height="56" />
      <instance id="144:1826" name="Arrow_01" x="1415.245849609375" y="69.0864486694336" width="41.83057106746094" height="27.325753050725382" />
      <text id="91:712" name="Development" x="1489.076416015625" y="68" width="187" height="28" />
    </frame>
    <frame id="91:1422" name="Business problem" x="360" y="1626.0740966796875" width="1200" height="254">
      <frame id="91:1423" name="Heading" x="71.595458984375" y="35" width="391.80908203125" height="184">
        <instance id="149:1916" name="Business Problem Heading" x="71.595458984375" y="35" width="391.80908203125" height="184" />
      </frame>
      <frame id="149:1945" name="List" x="543.404541015625" y="0" width="585" height="254">
        <text id="149:1946" name="Faster and more accurate data capturing." x="0" y="0" width="585" height="20" />
        <instance id="149:1947" name="Vertical Divider" x="0" y="68" width="585" height="1" />
        <text id="149:1948" name="Reduced swivel chairing between multiple interfaces and physical papers." x="0" y="117" width="585" height="19" />
        <instance id="149:1949" name="Vertical Divider" x="0" y="184" width="585" height="1" />
        <text id="149:1950" name="Tracking of where the request was in the process for better reporting." x="0" y="233" width="596" height="21" />
      </frame>
    </frame>
    <frame id="91:1437" name="Talking to agents" x="238" y="2040.0740966796875" width="1444" height="632.333251953125">
      <frame id="91:1438" name="Context" x="80" y="80" width="1212" height="188.333251953125">
        <frame id="91:1439" name="Top" x="0" y="0" width="487" height="188.333251953125">
          <frame id="91:1440" name="Heading" x="0" y="0" width="266" height="93.333251953125">
            <text id="91:1441" name="step by step" x="0" y="48.333251953125" width="266" height="45" />
            <text id="91:1442" name="taking it" x="0" y="0" width="220" height="45" />
          </frame>
          <frame id="91:1443" name="WHAT" x="0" y="117.333251953125" width="469" height="71">
            <frame id="91:1444" name="List" x="0" y="0" width="487" height="71">
              <frame id="91:1445" name="1" x="0" y="0" width="487" height="71">
                <text id="91:1446" name="I organised an observational study with an experienced member of the import collections team and asked them to process an import collection request from start to finish with me." x="0" y="0" width="495" height="71" />
              </frame>
            </frame>
          </frame>
        </frame>
        <instance id="91:1448" name="Horizontal divider" x="551" y="8.6666259765625" width="1" height="171" />
        <frame id="91:1447" name="Details" x="616" y="45.1666259765625" width="596" height="98">
          <frame id="91:1449" name="Q" x="0" y="0" width="588" height="98">
            <frame id="91:1450" name="Q1" x="0" y="0" width="588" height="27">
              <text id="91:1451" name="5 different platforms were being used." x="0" y="0" width="588" height="27" />
            </frame>
            <frame id="91:1452" name="Q1" x="0" y="51" width="574" height="47">
              <text id="91:1453" name="This journey was very reliant on physical documentation and some of it would need to stay that way due to legal restraints." x="0" y="0" width="574" height="47" />
            </frame>
          </frame>
        </frame>
      </frame>
      <frame id="92:1639" name="Img" x="80" y="316.333251953125" width="1284" height="236">
        <rounded-rectangle id="91:1454" name="Original Flow 1" x="0" y="0" width="1284" height="189" />
        <text id="92:1637" name="AS-is journey" x="1143" y="205" width="141" height="31" />
      </frame>
    </frame>
    <frame id="92:1579" name="Personas" x="237" y="2832.4072265625" width="1446" height="604">
      <frame id="92:1457" name="Personas" x="0" y="52.0078125" width="1446" height="564">
        <text id="92:1458" name="Trade Officer" x="0" y="52.0078125" width="270" height="45" />
        <text id="92:1459" name="Checker" x="498" y="52.0078125" width="179" height="45" />
        <text id="92:1460" name="client" x="996" y="52.0078125" width="125" height="45" />
        <frame id="92:1461" name="Personas" x="0" y="121.0078125" width="1446" height="447">
          <frame id="92:1462" name="Persona 1" x="0" y="0" width="450" height="444">
            <frame id="92:1463" name="Intro" x="40" y="40" width="250" height="66">
              <text id="92:1464" name="Bank employee responsible for receiving and capturing data." x="0" y="0" width="250" height="46" />
            </frame>
            <frame id="92:1465" name="Details" x="40" y="130" width="370" height="274">
              <frame id="92:1466" name="1" x="0" y="0" width="370" height="89">
                <text id="92:1467" name="goals" x="0" y="0" width="370" height="22" />
                <text id="92:1468" name="Capture data as fast and accurately as possible." x="0" y="38" width="294" height="51" />
              </frame>
              <vector id="92:1469" name="Vector 10" x="27" y="114" width="316.0000000093378" height="1" hidden="true" />
              <frame id="92:1470" name="2" x="0" y="113" width="370" height="135">
                <text id="92:1471" name="Pain points" x="0" y="0" width="370" height="22" />
                <text id="92:1472" name="Swivel chairing; Not being able to track feedback; Time spent uploading data." x="0" y="38" width="370" height="97" />
              </frame>
            </frame>
            <frame id="92:1473" name="The Checker" x="469.15625" y="-119" width="144.33287048339844" height="229">
              <instance id="92:1474" name="body/Blazer Black Tee" x="469.15625" y="-30.8197021484375" width="144.33287048339844" height="140.81971740722656" />
              <instance id="92:1475" name="head/Gray Medium" x="429.455078125" y="-119" width="83.458984375" height="108.92874908447266" />
              <instance id="92:1476" name="FACE" x="401.40234375" y="-83.2669677734375" width="50.99291229248047" height="56.289466857910156" />
              <instance id="92:1477" name="FACIAL HAIR" x="407.75109481811523" y="-54.065406799316406" width="49.40489959716797" height="44.18626403808594" hidden="true" />
              <instance id="92:1478" name="ACCESORIES" x="421.1630859375" y="-72.70059204101562" width="69.16685485839844" height="26.511764526367188" hidden="true" />
            </frame>
          </frame>
          <frame id="92:1479" name="Persona 2" x="498" y="0" width="450" height="447">
            <instance id="92:1480" name="peep-82" x="487" y="-151" width="216" height="292" />
            <frame id="92:1481" name="Intro" x="40" y="40" width="259" height="70">
              <text id="92:1482" name="The bank employee responsible for checking the data the Trade Officer uploaded." x="0" y="0" width="259" height="52" />
            </frame>
            <frame id="92:1483" name="Details" x="40" y="134" width="370" height="273">
              <frame id="92:1484" name="1" x="0" y="0" width="370" height="57">
                <text id="92:1485" name="goals" x="0" y="0" width="370" height="22" />
                <text id="92:1486" name="Ensure input data accuracy." x="0" y="38" width="370" height="19" />
              </frame>
              <vector id="92:1487" name="Vector 10" x="105" y="82.00000762939453" width="160.00000000933787" height="1.0000077486038208" hidden="true" />
              <frame id="92:1488" name="2" x="0" y="91" width="370" height="182">
                <text id="92:1489" name="Pain points" x="0" y="0" width="370" height="22" />
                <text id="92:1490" name="Keeping track of projects waiting for checking; long feedback threads via email; Unnecessary input mistakes." x="0" y="38" width="288" height="128" />
              </frame>
            </frame>
          </frame>
          <frame id="92:1491" name="Persona 3" x="996" y="0" width="450" height="442">
            <frame id="92:1492" name="Intro" x="40" y="40" width="259" height="65">
              <text id="92:1493" name="A business working with the bank on an import collection request" x="0" y="0" width="259" height="72" />
            </frame>
            <frame id="92:1494" name="Details" x="40" y="129" width="370" height="273">
              <frame id="92:1495" name="1" x="0" y="0" width="370" height="135">
                <text id="92:1496" name="goals" x="0" y="0" width="370" height="22" />
                <text id="92:1497" name="Provide accurate data; Ensure input data accuracy; Monitoring progress." x="0" y="38" width="370" height="97" />
              </frame>
              <frame id="92:1498" name="2" x="0" y="159" width="370" height="114">
                <text id="92:1499" name="Pain points" x="0" y="0" width="370" height="22" />
                <text id="92:1500" name="Not knowing where in the process they are; Long wait times." x="0" y="38" width="370" height="64" />
              </frame>
            </frame>
            <instance id="92:1501" name="Person" x="491" y="-145" width="204" height="275" />
          </frame>
        </frame>
        <text id="92:1608" name="based on trade officer insights." x="996" y="584.0078125" width="450" height="32" />
      </frame>
    </frame>
    <frame id="92:1636" name="Designs" x="0" y="3596.4072265625" width="1920" height="1622.749267578125">
      <text id="163:2244" name="the new user journey" x="235" y="80" width="1367" height="90" />
      <frame id="92:1773" name="Flows" x="235" y="250" width="1450" height="222">
        <frame id="92:1757" name="01" x="0" y="0" width="1450" height="222">
          <frame id="92:1622" name="Context" x="0" y="0" width="501" height="222">
            <frame id="162:2116" name="Right" x="0" y="0" width="501" height="222">
              <text id="162:2117" name="Trade officer flow" x="0" y="0" width="492" height="31" />
              <frame id="162:2118" name="Detail" x="0" y="55" width="501" height="167">
                <frame id="162:2119" name="Problem" x="0" y="0" width="501" height="72">
                  <text id="162:2120" name="insight" x="0" y="0" width="119" height="16" />
                  <text id="162:2121" name="The trade officers were losing context and focus by swopping between 5 different systems." x="0" y="24" width="501" height="48" />
                </frame>
                <frame id="162:2122" name="Design" x="0" y="96" width="501" height="71">
                  <text id="162:2123" name="decision" x="0" y="0" width="131" height="15" />
                  <text id="162:2124" name="I integrated the required programs where possible for a more seamless journey." x="0" y="23" width="501" height="48" />
                </frame>
              </frame>
            </frame>
          </frame>
          <rounded-rectangle id="92:1634" name="TO" x="581" y="1.6481857299804688" width="709" height="218.70362854003906" />
        </frame>
      </frame>
      <frame id="163:2153" name="Flows" x="235" y="552" width="1289" height="404.74920654296875">
        <frame id="163:2166" name="2" x="0" y="0" width="1289" height="404.74920654296875">
          <frame id="163:2167" name="Image and Description" x="0" y="0" width="679" height="404.74920654296875">
            <rounded-rectangle id="163:2168" name="Checker Flow" x="0" y="0" width="679" height="404.74920654296875" />
          </frame>
          <frame id="163:2169" name="Context" x="759" y="51.374603271484375" width="532" height="302">
            <frame id="163:2170" name="Right" x="0" y="0" width="531" height="302">
              <text id="163:2171" name="Checker flow" x="0" y="0" width="492" height="31" />
              <frame id="163:2172" name="Detail" x="0" y="55" width="531" height="247">
                <frame id="163:2173" name="Problem" x="0" y="0" width="531" height="72">
                  <text id="163:2174" name="insight" x="0" y="0" width="119" height="16" />
                  <text id="163:2175" name="Checkers didn’t have easy access to projects and needed a way to give and track feedback on the platform." x="0" y="24" width="532" height="48" />
                </frame>
                <frame id="163:2176" name="Design" x="0" y="96" width="531" height="151">
                  <text id="163:2177" name="decision" x="0" y="0" width="131" height="15" />
                  <text id="163:2178" name="I separated the trade officer and checkers flows to create Checker specific journeys that cater to their needs. I also streamlined the feedback and changes loop so that feedback would be automatically tracked and kept in context of the project." x="0" y="23" width="532" height="128" />
                </frame>
              </frame>
            </frame>
          </frame>
        </frame>
      </frame>
      <frame id="163:2195" name="Flows" x="235" y="1036.749267578125" width="1292" height="506">
        <frame id="163:2221" name="3" x="0" y="0" width="1292" height="506">
          <frame id="163:2222" name="Context" x="0" y="142.5" width="525" height="221">
            <frame id="163:2223" name="H" x="0" y="0" width="0" height="0" />
            <frame id="163:2225" name="Context" x="0" y="0" width="532" height="221">
              <frame id="163:2226" name="Right" x="0" y="-0.5" width="531" height="222">
                <text id="163:2227" name="client flow" x="0" y="0" width="492" height="31" />
                <frame id="163:2228" name="Detail" x="0" y="55" width="531" height="167">
                  <frame id="163:2229" name="Problem" x="0" y="0" width="531" height="72">
                    <text id="163:2230" name="insight" x="0" y="0" width="119" height="16" />
                    <text id="163:2231" name="Clients weren’t getting as much information as they needed to feel confident that there was progress." x="0" y="24" width="532" height="48" />
                  </frame>
                  <frame id="163:2232" name="Design" x="0" y="96" width="531" height="71">
                    <text id="163:2233" name="decision" x="0" y="0" width="131" height="15" />
                    <text id="163:2234" name="I made the content more accessible, trackable and easier to capture or approve the captured data." x="0" y="23" width="532" height="48" />
                  </frame>
                </frame>
              </frame>
            </frame>
          </frame>
          <rounded-rectangle id="163:2235" name="Client Journey 1" x="605" y="0" width="683" height="506" />
        </frame>
      </frame>
    </frame>
    <frame id="92:1774" name="Solutions" x="2" y="5379.15625" width="1916" height="2861">
      <frame id="91:1065" name="Easier Data Capture" x="224" y="0" width="1468" height="863">
        <frame id="91:1066" name="Easier Data Capture" x="0" y="0" width="1300" height="333.43646240234375">
          <frame id="91:1067" name="Info" x="192" y="59.54377365112305" width="1108" height="273.89276123046875">
            <frame id="91:1068" name="Inisght" x="0" y="0" width="507" height="227">
              <frame id="91:1069" name="Problem" x="0" y="0" width="507" height="77">
                <text id="91:1070" name="problem" x="0" y="0" width="120.99565887451172" height="21" />
                <text id="91:1071" name="Trade officer users were working on an interface that made it hard to keep track of where they were working." x="0" y="29" width="507" height="48" />
              </frame>
              <instance id="91:1072" name="Vertical Divider" x="0" y="101" width="507" height="1" />
              <frame id="91:1073" name="Outcome" x="0" y="126" width="507" height="101">
                <text id="91:1074" name="Outcome" x="0" y="126" width="118" height="21" />
                <text id="91:1075" name="This approach not only reduces the amount of information the user sees at once, it also helps them restart in case they are disturbed while working." x="0" y="155" width="507" height="72" />
              </frame>
            </frame>
            <frame id="91:1076" name="Design" x="587" y="0" width="509" height="255">
              <frame id="91:1077" name="Design" x="0" y="2" width="505" height="103.43647766113281">
                <text id="91:1078" name="solution" x="0" y="2" width="117.07269287109375" height="21.516401290893555" />
                <text id="91:1079" name="I broke down the data required into smaller chunks and organised them according to how they are likely to appear on the documentation." x="0" y="31.607223510742188" width="505" height="73.82929992675781" />
              </frame>
              <frame id="163:2237" name="Future state" x="0" y="129.4364776611328" width="505" height="142">
                <frame id="163:2238" name="Intro" x="20" y="20" width="465" height="102">
                  <text id="163:2239" name="Future State | ‘Automagical’ Data Population" x="0" y="0" width="392" height="21" />
                  <text id="163:2240" name="Allow the Trade Officer to upload the scanned documentation and use a document scanning API to automatically fill in the data as it saw it on the document. Leaving the Trade Officer to just check the data." x="0" y="23" width="446" height="63" />
                </frame>
              </frame>
            </frame>
          </frame>
          <text id="91:1084" name="Easier Data Capture" x="1.1368683772161603e-13" y="0" width="243" height="90.22349548339844" />
        </frame>
        <frame id="91:1085" name="Imgs" x="0" y="381.43646240234375" width="1468" height="482">
          <frame id="91:1086" name="Before" x="0" y="395.43646240234375" width="605.3267822265625" height="304.84912109375">
            <frame id="91:1087" name="Before" x="-1.70904541015625" y="0" width="607.0358276367188" height="304.84912109375">
              <rounded-rectangle id="91:1088" name="Screenshot 2024-05-27 at 11.27 1" x="-1.7089759707450867" y="0" width="607.0358276367188" height="304.84912109375" />
              <rounded-rectangle id="91:1089" name="Screenshot 2024-05-27 at 11.27 8" x="183.32980346679688" y="230.3008270263672" width="69.22338104248047" height="5.324875354766846" />
              <rounded-rectangle id="91:1090" name="Screenshot 2024-05-27 at 11.27 11" x="183.32980346679688" y="256.9255065917969" width="45.261444091796875" height="6.656094551086426" />
              <rounded-rectangle id="91:1091" name="Screenshot 2024-05-27 at 11.27 12" x="183.32980346679688" y="274.2308654785156" width="45.261444091796875" height="17.305845260620117" />
              <rounded-rectangle id="91:1092" name="Screenshot 2024-05-27 at 11.27 10" x="183.32980346679688" y="220.9825439453125" width="69.22338104248047" height="6.656094551086426" />
              <rounded-rectangle id="91:1093" name="Screenshot 2024-05-27 at 11.27 9" x="183.32980346679688" y="211.66372680664062" width="45.261444091796875" height="7.987313270568848" />
              <rounded-rectangle id="91:1094" name="Screenshot 2024-05-27 at 11.27 5" x="183.32980346679688" y="103.83482360839844" width="45.261444091796875" height="9.318531036376953" />
              <rounded-rectangle id="91:1095" name="Screenshot 2024-05-27 at 11.27 6" x="183.32980346679688" y="185.03956604003906" width="45.261444091796875" height="7.987313270568848" />
              <rounded-rectangle id="91:1096" name="Screenshot 2024-05-27 at 11.27 7" x="183.32980346679688" y="149.0966033935547" width="45.261444091796875" height="9.318531036376953" />
              <rounded-rectangle id="91:1097" name="Screenshot 2024-05-27 at 11.27 4" x="183.32980346679688" y="95.84774780273438" width="47.92387771606445" height="7.987313270568848" />
              <rounded-rectangle id="91:1098" name="Screenshot 2024-05-27 at 11.27 3" x="183.32980346679688" y="78.5418701171875" width="47.92387771606445" height="6.656094551086426" />
              <rounded-rectangle id="91:1099" name="Screenshot 2024-05-27 at 11.27 2" x="183.32980346679688" y="33.28061294555664" width="47.92387771606445" height="7.987313270568848" />
              <rounded-rectangle id="91:1100" name="Screenshot 2024-05-27 at 11.27 13" x="364.3756103515625" y="30.618253707885742" width="203.67648315429688" height="85.19800567626953" />
            </frame>
            <text id="91:1101" name="before" x="0" y="316.84912109375" width="605.3267822265625" height="14" hidden="true" />
          </frame>
          <frame id="91:1102" name="After" x="697" y="381.43646240234375" width="771" height="482">
            <rounded-rectangle id="91:1103" name="Import Collections - Registration Journey - 01 Internal Information 1" x="0" y="0" width="765" height="482" />
          </frame>
          <frame id="91:1104" name="Arrow" x="668.396728515625" y="712.4364318847656" width="76.57270225031526" height="62.20396603652716" />
        </frame>
        <text id="91:1107" name="after" x="621" y="712" width="36" height="22" />
      </frame>
      <frame id="91:1039" name="Reviewing data &amp; Requesting Changes" x="0" y="1023" width="1916" height="952">
        <frame id="91:1041" name="Info" x="176" y="80" width="1564" height="224">
          <frame id="91:1042" name="Inisght" x="242" y="41" width="509" height="183">
            <text id="91:1053" name="Reviewing data &amp; Requesting Changes" x="0" y="0" width="509" height="90" />
            <frame id="91:1043" name="Problem" x="0" y="114" width="509" height="70">
              <text id="91:1044" name="problem" x="0" y="114" width="509" height="21" />
              <text id="91:1045" name="Feedback was being given to Trade Officer users in parts over email or verbally. This made it difficult to track changes made." x="0" y="136" width="509" height="48" />
            </frame>
          </frame>
          <frame id="91:1046" name="Design" x="831" y="15" width="491" height="209">
            <frame id="91:1047" name="Outcome" x="0" y="2" width="509" height="71">
              <text id="91:1048" name="Outcome" x="0" y="2" width="118.46548461914062" height="21" />
              <text id="91:1049" name="The platform becomes the source of truth for anything to do with the project, making it easier to track changes and requests." x="0" y="25" width="509" height="48" />
            </frame>
            <frame id="91:1050" name="Design" x="0" y="97" width="509" height="110">
              <text id="91:1051" name="solution" x="-9.094947017729282e-13" y="97" width="480" height="21" />
              <text id="91:1052" name="Checker users are able to add comments to the project file that would trigger an email and platform notification for the Trade Officer. These comments would also be trackable in the project history, making the process smoother and easier to follow up on." x="0" y="119" width="509" height="88" />
            </frame>
          </frame>
        </frame>
        <frame id="91:1054" name="Images" x="176" y="352" width="1564" height="520">
          <frame id="91:1055" name="Before" x="0" y="0" width="752" height="520">
            <rounded-rectangle id="91:1056" name="Import Collections - Checker Journey - 01 Summary 1" x="0" y="0" width="752" height="482" />
            <text id="91:1057" name="Checker summary screen" x="0" y="498" width="752" height="22" />
          </frame>
          <frame id="91:1058" name="New" x="800" y="0" width="764" height="520">
            <rounded-rectangle id="91:1059" name="Import Collections - Registration Journey - 01 Internal Information 1" x="0" y="0" width="764" height="482" />
            <text id="91:1060" name="Change request pop-up" x="0" y="498" width="764" height="22" />
          </frame>
        </frame>
      </frame>
      <frame id="91:1021" name="Status tracker" x="237" y="2135" width="1442" height="726">
        <frame id="91:1022" name="Content" x="0" y="0" width="598" height="589">
          <text id="91:1023" name="a Status tracker for every role" x="0" y="0" width="446" height="86" />
          <frame id="91:1024" name="Inisght" x="0" y="110" width="598" height="479">
            <frame id="91:1025" name="Problem" x="0" y="0" width="598" height="98">
              <text id="91:1026" name="problem" x="0" y="0" width="142.71282958984375" height="21" />
              <text id="91:1027" name="Client users were reported to be frustrated that they weren’t getting enough feedback from the Trade Officers during processing because they didn’t know what phase of the progress they were in." x="0" y="26" width="598" height="72" />
            </frame>
            <frame id="91:1028" name="Design" x="0" y="122" width="598" height="179">
              <frame id="91:1029" name="Design" x="0" y="2" width="598" height="177">
                <text id="91:1030" name="solution" x="-9.094947017729282e-13" y="0" width="138.6326141357422" height="21" />
                <text id="91:1031" name="I added a user type specific status tracker to the product dashboards that displayed the steps taken, the steps in progress and the future steps. I also added a tracker for the Due Diligence checks to keep communication transparent and continue the feeling of progress during a notoriously slow process." x="0" y="26" width="598" height="151" />
              </frame>
            </frame>
            <frame id="91:1032" name="Outcome" x="0" y="325" width="598" height="154">
              <text id="91:1033" name="Outcome" x="0" y="0" width="593.0414428710938" height="21" />
              <text id="91:1034" name="All user types are able to see where in the process the documents are and what the next steps are without having to ask a Trade Officer. All users also have access to dedicated compliance tracking (KYC, sanctions, and due-diligence checks)." x="0" y="26" width="598" height="128" />
            </frame>
          </frame>
        </frame>
        <frame id="91:1035" name="Img" x="678" y="0" width="764" height="726">
          <rounded-rectangle id="91:1036" name="Import Collections - Product Page - Trade Officer 3" x="0" y="0" width="754" height="688" />
          <text id="91:1037" name="trade officer dashboard" x="0" y="704" width="764" height="22" />
        </frame>
      </frame>
    </frame>
    <frame id="99:2454" name="Handover" x="239" y="8400.15625" width="1442" height="283">
      <frame id="99:2455" name="Final" x="288" y="80" width="866" height="123">
        <text id="99:2456" name="Development &amp; next iteration" x="0" y="16.5" width="334" height="90" />
        <text id="99:2457" name="After a hand over session with the Development team, I supported the team during the coding process. When I stepped away from this project I included future state wireframes for the above mentioned improvements." x="382" y="0" width="470" height="123" />
      </frame>
    </frame>
    <instance id="177:593" name="Read More" x="111" y="8843.15625" width="1698" height="391" />
  </frame>
  <frame id="92:1823" name="💻 Case Study 3" x="1251" y="-1724" width="1920" height="7400">
    <frame id="92:1824" name="Navigation" x="-0.1962890625" y="0" width="1920.392578125" height="170.0740966796875">
      <instance id="92:1825" name="Navigation" x="0" y="0" width="1920" height="90.07408142089844" />
      <instance id="144:1102" name="Sub Nav" x="0" y="90.07408142089844" width="1920.392578125" height="80.00001525878906" />
    </frame>
    <frame id="144:1560" name="Introduction" x="110" y="330.0740966796875" width="1700" height="777">
      <instance id="144:1528" name="Intro" x="0" y="0" width="687" height="783.1836547851562" />
    </frame>
    <rounded-rectangle id="99:2503" name="Screenshot 2024-07-24 at 2.59.51 PM 1" x="915" y="441" width="1042" height="629" />
    <frame id="92:1866" name="Process" x="0" y="1267.0740966796875" width="1920" height="164">
      <text id="92:1867" name="Identify Business Needs" x="217.92356872558594" y="40" width="129" height="84" />
      <instance id="144:1830" name="Arrow_01" x="378.923583984375" y="69.0864486694336" width="41.83057106746105" height="27.325753050725382" />
      <text id="92:1869" name="AS-IS Journey Investigations" x="452.754150390625" y="54" width="204" height="56" />
      <instance id="144:1834" name="Arrow_01" x="688.754150390625" y="69.0864486694336" width="41.83057106746105" height="27.325753050725382" />
      <text id="92:1871" name="User Interviews" x="762.584716796875" y="54" width="159" height="56" />
      <instance id="144:1838" name="Arrow_01" x="953.584716796875" y="69.0864486694336" width="41.83057106746082" height="27.325753050725382" />
      <text id="92:1873" name="Ideation Workshop" x="1027.415283203125" y="54" width="142" height="56" />
      <instance id="144:1842" name="Arrow_01" x="1201.415283203125" y="69.0864486694336" width="41.83057106746082" height="27.325753050725382" />
      <text id="92:1875" name="User Journey Design" x="1275.245849609375" y="54" width="196" height="56" />
      <instance id="144:1846" name="Arrow_01" x="1503.245849609375" y="69.0864486694336" width="41.83057106746082" height="27.325753050725382" />
      <text id="92:1877" name="Proposal" x="1577.076416015625" y="68" width="125" height="28" />
    </frame>
    <frame id="92:1878" name="Business problem" x="342" y="1591.0740966796875" width="1236" height="368">
      <instance id="149:1925" name="Business Problem Heading" x="105.595458984375" y="0" width="391.80908203125" height="184" />
      <frame id="149:1956" name="List" x="545.404541015625" y="0" width="585" height="362">
        <text id="149:1957" name="A streamlined quoting and sales workflow." x="0" y="0" width="585" height="20" />
        <instance id="149:1958" name="Vertical Divider" x="0" y="52" width="585" height="1" />
        <text id="149:1959" name="Self-sufficient users for new and existing features." x="0" y="85" width="585" height="19" />
        <instance id="149:1960" name="Vertical Divider" x="0" y="136" width="585" height="1" />
        <text id="149:1961" name="A lower barrier to entry for new staff that require fewer days of training." x="0" y="169" width="596" height="21" />
        <instance id="149:1965" name="Vertical Divider" x="0" y="222" width="585" height="1" />
        <text id="149:1966" name="Automation &amp; auto population in the journey where possible." x="0" y="255" width="596" height="21" />
        <instance id="149:1969" name="Vertical Divider" x="0" y="308" width="585" height="1" />
        <text id="149:1970" name="Reduce quoting turnaround time from 7 days." x="0" y="341" width="596" height="21" />
      </frame>
    </frame>
    <frame id="99:2631" name="AS-IS" x="0" y="2119.07421875" width="1920" height="1381">
      <frame id="99:2596" name="Talking to agents" x="0" y="0" width="1920" height="1164">
        <frame id="99:2597" name="Context" x="236" y="80" width="1447" height="327">
          <rounded-rectangle id="99:2618" name="Img" x="0" y="0" width="449" height="327" />
          <frame id="99:2598" name="Top" x="529" y="0" width="764" height="185.81640625">
            <frame id="99:2634" name="Intro and copy" x="0" y="0" width="718" height="185.81640625">
              <frame id="99:2599" name="Heading" x="0" y="0" width="407" height="90">
                <text id="99:2601" name="AS-IS Journey Investigations" x="0" y="0" width="407" height="90" />
              </frame>
              <text id="99:2605" name="To better understand how the platform was supposed to be used my team and I had a workshop with a leader that manages training of new staff. With her help we developed an in-depth AS IS map with explanations of related responsibilities, platforms and processes ." x="0" y="113.81640625" width="718" height="72" />
            </frame>
            <frame id="99:2651" name="Label" x="-44" y="289.81640625" width="248.35574340820312" height="31">
              <instance id="99:2647" name="Arrow" x="41.35574722290039" y="26.580793380737305" width="41.355745731970046" height="26.580796996171557" />
              <text id="99:2632" name="workshop artifact" x="64.35574340820312" y="0" width="184" height="31" />
            </frame>
          </frame>
        </frame>
        <frame id="99:2624" name="Img" x="236" y="487" width="1446" height="597">
          <rounded-rectangle id="99:2625" name="image 15" x="2" y="0" width="1444" height="539" />
          <text id="99:2626" name="AS-is journey" x="1300" y="565" width="146" height="32" />
        </frame>
      </frame>
      <frame id="99:2529" name="Hook" x="236.5" y="1244" width="1447" height="137">
        <text id="99:2530" name="key session insight" x="0" y="0" width="1447" height="31" />
        <text id="99:2531" name="Employees were leaving because of the system" x="0" y="47" width="1447" height="90" />
      </frame>
      <frame id="92:1890" name="Talking to agents" x="0" y="1201.73681640625" width="1920" height="140" />
    </frame>
    <frame id="98:2316" name="User interviews" x="238" y="3660.07421875" width="1444" height="518">
      <frame id="98:2317" name="Heading and stat" x="114" y="80" width="669" height="344">
        <text id="98:2322" name="User interviews &amp; observations" x="0" y="2.5" width="341" height="90" />
        <text id="163:2246" name="If a new sales quote was found to be incorrect at any step past the original ‘data capture form’ the sale would be considered a ‘Lost lead’ and would have to be redone. The term ‘Lost lead’ was then recorded on the sales persons monthly sales reports, same as leads that were actually lost/failed." x="0" y="116.5" width="669" height="108" />
        <frame id="163:2252" name="Heading" x="0" y="248.5" width="174" height="93">
          <text id="163:2253" name="15+" x="0" y="-4.5" width="174" height="84" />
          <text id="163:2254" name="users spoken to" x="0" y="79.5" width="135" height="18" />
        </frame>
      </frame>
      <frame id="98:2333" name="List" x="863" y="80" width="467" height="358">
        <text id="98:2334" name="There were fields that nobody understood." x="0" y="0" width="487" height="23" />
        <instance id="98:2335" name="Vertical Divider" x="0" y="55" width="467" height="1" />
        <text id="98:2336" name="The sales team had to follow steps in the system that they felt were redundant." x="0" y="88" width="492" height="47" />
        <instance id="98:2337" name="Vertical Divider" x="0" y="167" width="467" height="1" />
        <text id="98:2338" name="Many key steps were being presented to the user either too early or too late in the journey." x="0" y="200" width="467" height="48" />
        <instance id="98:2339" name="Vertical Divider" x="0" y="280" width="467" height="1" />
        <text id="98:2340" name="New staff found the platform very hard to learn and had to rely on notes and recordings." x="0" y="313" width="467" height="48" />
        <instance id="98:2341" name="Vertical Divider" x="0" y="393" width="350" height="1" />
      </frame>
    </frame>
    <frame id="168:2839" name="Key Pain points" x="237" y="4338.07421875" width="1446" height="657">
      <frame id="99:2653" name="Heading" x="0" y="0" width="1446" height="90">
        <frame id="99:2654" name="Quote" x="769" y="18.07421875" width="677" height="62">
          <text id="99:2655" name="“" x="0" y="0" width="13" height="39" />
          <text id="99:2656" name="there are things that I&#39;m gonna be capturing, but if you ask me ‘why are you capturing this?’ I won&#39;t know." x="29" y="0" width="612" height="62" />
          <text id="99:2657" name="”" x="639" y="0" width="17" height="39" />
        </frame>
        <text id="99:2659" name="Key Pain points" x="0" y="0" width="243" height="90" />
      </frame>
      <frame id="99:2652" name="Pain Points" x="0" y="114" width="1446" height="543">
        <frame id="99:2683" name="Key" x="0" y="0" width="1446" height="364">
          <frame id="99:2684" name="01" x="0" y="0" width="700" height="364">
            <text id="99:2685" name="01" x="40" y="40" width="35" height="26" />
            <frame id="99:2686" name="Content" x="99" y="40" width="529" height="284">
              <text id="99:2687" name="An overly complex system" x="0" y="0" width="529" height="50" />
              <text id="99:2688" name="Training new sales representatives took 1 month with an additional month of monitored work. The complex system design meant that new sales representatives relied on notes and recordings for years before becoming experts. There were no self-help tools like tooltips or wiki’s available to users. The system relied on user memory and not recognition." x="0" y="74" width="529" height="210" />
            </frame>
          </frame>
          <frame id="99:2689" name="02" x="740" y="0" width="704" height="364">
            <text id="99:2690" name="02" x="40" y="40" width="39" height="26" />
            <frame id="99:2691" name="Content" x="103" y="40" width="529" height="266">
              <text id="99:2692" name="The real world journey was different" x="0" y="0" width="529" height="50" />
              <text id="99:2693" name="Steps were placed in unrealistic times in the journey. Options in dropdowns or radio buttons didn’t match real information causing users to need to input additional information. Some vetting steps weren’t happening early enough  resulting in wasted time and disappointed clients. There were unnecessary approvals being required." x="0" y="74" width="529" height="191" />
            </frame>
          </frame>
        </frame>
        <frame id="99:2662" name="3-4" x="0" y="405" width="1446" height="138">
          <frame id="99:2663" name="03" x="0" y="0" width="456" height="138">
            <text id="99:2670" name="03" x="30" y="30" width="40" height="26" />
            <text id="99:2668" name="No platform integration or automation" x="86" y="30" width="315" height="78" />
          </frame>
          <frame id="165:2805" name="04" x="496" y="0" width="456" height="138">
            <text id="165:2808" name="04" x="30" y="30" width="41" height="26" />
            <text id="165:2810" name="No notifications" x="87" y="30" width="304" height="78" />
          </frame>
          <frame id="165:2815" name="5" x="992" y="0" width="456" height="138">
            <frame id="165:2816" name="Key" x="30" y="30" width="370" height="78">
              <frame id="165:2821" name="3" x="30" y="30" width="370" height="78">
                <text id="165:2822" name="05" x="0" y="0" width="40" height="26" />
                <text id="165:2820" name="Inaccessible language" x="56" y="0" width="203" height="50" />
              </frame>
            </frame>
          </frame>
        </frame>
      </frame>
    </frame>
    <frame id="92:1958" name="Journey" x="2" y="5155.07421875" width="1916" height="967">
      <frame id="98:2263" name="Heading &amp; Description" x="319" y="80" width="1246" height="114">
        <text id="98:2265" name="Building a realistic user journey" x="53" y="12" width="397" height="90" />
        <text id="98:2266" name="Using the information gathered we brainstormed ways to improve the AS-IS journey, with the sole goal of making the process match our users real-life sales journey and creating an agile approach to their workflow, allowing for multiple work streams to happen at once." x="498" y="0" width="695" height="114" />
      </frame>
      <frame id="98:2267" name="Img" x="319" y="274" width="1246" height="613">
        <rounded-rectangle id="98:2268" name="Screenshot 2024-07-24 at 2.59.51 PM 1" x="319" y="274" width="1246" height="566" />
        <text id="98:2269" name="AS-IS map" x="319" y="856" width="1246" height="31" />
      </frame>
    </frame>
    <frame id="99:2794" name="Proposal" x="478.5" y="6282.07421875" width="963" height="407">
      <frame id="99:2796" name="Content" x="-0.5" y="-0.07421875" width="962" height="420">
        <frame id="99:2797" name="Reduction" x="48" y="0" width="293" height="163">
          <text id="99:2798" name="14 steps" x="49" y="0" width="292" height="163" />
          <text id="99:2799" name="Reducing the" x="48" y="32" width="178" height="47" />
          <text id="99:2800" name="journey from 22 to" x="71" y="53" width="154" height="26" />
        </frame>
        <frame id="99:2802" name="H1" x="389" y="0" width="573" height="420">
          <text id="99:2803" name="The proposal &amp; future steps" x="0" y="0" width="573" height="90" />
          <text id="99:2804" name="Leveraging all the information gathered and artifacts created I prepared and presented a UX proposal for the CTO that outlined: My process; The problems found; A breakdown of detailed key feedback, recommendations (based on user research and desktop research) and indication of if it is a quick win or a future win. A list of key metrics to measure the ROI of the changes such as average time on task, new user onboarding time etc." x="0" y="114" width="573" height="290" />
        </frame>
      </frame>
    </frame>
    <frame id="92:2089" name="Read More" x="-60" y="6849.07421875" width="2040" height="551">
      <instance id="177:554" name="Read More" x="171" y="80" width="1698" height="391" />
    </frame>
  </frame>
  <frame id="99:2978" name="iPhone 16 - 2" x="-5617" y="-1541" width="393" height="4773">
    <frame id="99:3117" name="Talking to agents" x="0" y="2139" width="393" height="883">
      <frame id="99:3118" name="Top" x="35.5" y="40" width="319" height="267">
        <frame id="99:3119" name="Intro" x="0" y="0" width="295" height="93">
          <frame id="99:3120" name="Heading" x="0" y="0" width="251" height="93">
            <text id="99:3121" name="the experts" x="0" y="48" width="251" height="45" />
            <text id="99:3122" name="Talking TO" x="0" y="0" width="205" height="45" />
          </frame>
        </frame>
        <frame id="99:3123" name="Quote" x="0" y="157" width="319" height="110">
          <text id="99:3124" name="“" x="0" y="0" width="13" height="39" />
          <text id="99:3125" name="Customers always ask ‘how much longer?’ or ‘why do you need to know this?’ because the system asks unnecessary questions and it takes forever" x="18" y="0" width="290" height="110" />
          <text id="99:3126" name="”" x="313" y="0" width="17" height="39" />
        </frame>
      </frame>
      <frame id="99:3127" name="Details" x="38" y="355" width="314" height="627">
        <frame id="99:3128" name="WHAT" x="0" y="0" width="300.4683532714844" height="168">
          <frame id="99:3129" name="List" x="0" y="0" width="305" height="168">
            <frame id="99:3130" name="1" x="0" y="0" width="305" height="45">
              <text id="99:3131" name="?" x="0" y="8.5" width="15.03797435760498" height="28" />
              <text id="99:3132" name="Spoke to credit SME’s about how scoring works per product." x="31.037975311279297" y="0" width="269.4303894042969" height="45" />
            </frame>
            <frame id="99:3133" name="2" x="0" y="69" width="305" height="47">
              <text id="99:3134" name="?" x="0" y="9.5" width="12" height="28" />
              <text id="99:3135" name="Interviewed Agents who already use the existing platform." x="28" y="0" width="277" height="47" />
            </frame>
            <frame id="99:3136" name="3" x="0" y="140" width="305" height="28">
              <text id="99:3137" name="?" x="0" y="0" width="12" height="28" />
              <text id="99:3138" name="Observed 3 real Customer calls." x="28" y="0" width="277" height="28" />
            </frame>
          </frame>
        </frame>
        <instance id="99:3146" name="Horizontal divider" x="267" y="208" width="267.00000004371213" height="1.0000233534510699" />
        <frame id="99:3140" name="How" x="0" y="249" width="314" height="238">
          <text id="99:3141" name="Key learnings" x="0" y="0" width="314" height="22" />
          <frame id="99:3142" name="Copy" x="0" y="38" width="314" height="200">
            <text id="99:3143" name="Customers get an affordability amount given to them by the bank. Customers come to Agents with problems they need solved rather then products in mind. Customers were frustrated and feel the process takes too long." x="0" y="0" width="314" height="200" />
          </frame>
        </frame>
      </frame>
    </frame>
    <frame id="99:3107" name="Process" x="40" y="1239" width="463" height="138">
      <frame id="99:3086" name="Process 1" x="40" y="1239" width="189" height="138">
        <text id="99:3084" name="Identify Business Needs" x="30" y="30" width="129" height="78" />
      </frame>
      <frame id="99:3104" name="Process 2" x="242" y="1239" width="261" height="138">
        <text id="99:3105" name="AS-IS Journey Investigations" x="30" y="30" width="206" height="52" />
      </frame>
    </frame>
    <frame id="99:3046" name="Business problem" x="40" y="1463" width="313" height="607">
      <frame id="99:3047" name="Heading" x="0" y="0" width="313" height="206">
        <text id="99:3048" name="During a full day workshop with my key stakeholders I identified:" x="0" y="146" width="313" height="60" />
        <frame id="99:3049" name="H1" x="0" y="0" width="208.6666717529297" height="108">
          <text id="99:3050" name="business problem" x="0" y="28" width="208.6666717529297" height="80" />
          <text id="99:3051" name="the" x="0" y="0" width="29.957096099853516" height="31" />
        </frame>
      </frame>
      <frame id="99:3052" name="List" x="0" y="246" width="313" height="361">
        <text id="99:3053" name="Each business unit operated its own team of specialised Agents, each focused on one or two products." x="0" y="0" width="313" height="48" />
        <instance id="99:3054" name="Vertical Divider" x="0" y="96" width="313" height="1" />
        <text id="99:3055" name="Repeated transfers were happening in the call centres and Customers were dropping calls to go to branches." x="0" y="145" width="313" height="67" />
        <instance id="99:3056" name="Vertical Divider" x="0" y="260" width="313" height="1" />
        <text id="99:3057" name="Agents had limited cross-selling opportunities." x="0" y="309" width="313" height="52" />
      </frame>
    </frame>
    <frame id="99:3025" name="Left Content" x="40" y="106" width="312" height="1063.563720703125">
      <frame id="99:3026" name="Title" x="0" y="0" width="312" height="482.5637512207031">
        <frame id="99:3027" name="Header" x="0" y="0" width="312.33526611328125" height="289.5637512207031">
          <text id="99:3028" name="ux/ui designer" x="0" y="0" width="154" height="31" />
          <text id="99:3029" name="Streamlining scoring for multiple products" x="0.34713470935821533" y="47.000003814697266" width="312.335256856255" height="192.56374542452886" />
          <frame id="99:3030" name="User Group" x="0" y="255.56375122070312" width="185" height="34">
            <frame id="99:3031" name="face_4" x="11" y="7" width="20" height="20" />
            <text id="99:3034" name="Call centre agents" x="39" y="5" width="135" height="24" />
          </frame>
        </frame>
        <text id="99:3035" name="Absa wanted to streamline its credit product scoring within their Salesforce CRM so that a single call centre Agent could handle multiple product types in one interaction." x="0" y="347.5637512207031" width="312" height="135" />
        <frame id="99:3113" name="ABSA Definition" x="-17" y="178" width="329" height="170">
          <frame id="99:3114" name="Definition" x="0" y="-1" width="329" height="152">
            <text id="99:3115" name="Absa A multinational banking and financial services provider, based in Johannesburg ZA." x="16" y="16" width="297" height="120" />
          </frame>
          <regular-polygon id="99:3116" name="Polygon 1" x="64" y="170" width="28.000002447837687" height="33.75886830773902" />
        </frame>
      </frame>
      <frame id="99:3036" name="Goal and outcome" x="0" y="542.563720703125" width="312" height="521">
        <frame id="99:3037" name="Project Goal" x="0" y="0" width="312" height="164">
          <text id="99:3038" name="project goal" x="0" y="0" width="312" height="28" />
          <text id="99:3039" name="Design a unified scoring page that fit into a larger multi-product onboarding journey aimed at reducing Customer time spent on the phone and increases product sales." x="0" y="44" width="312" height="120" />
        </frame>
        <instance id="99:3040" name="Vertical Divider" x="0" y="212" width="312" height="1" />
        <frame id="99:3041" name="Project Goal" x="0" y="261" width="312" height="260">
          <text id="99:3042" name="project outcome" x="0" y="0" width="312" height="22" />
          <text id="99:3043" name="I designed a consolidated scoring page that allows Agents to score, customise and add multiple credit products in a single call. Usability testing showed 14 of 15 users completed tasks unaided. I owned discovery through to validating design and handed over a tested interface along with a recommended way forward." x="0" y="38" width="312" height="222" />
        </frame>
      </frame>
    </frame>
    <instance id="99:3018" name="dehaze" x="314" y="31" width="44" height="44" />
  </frame>
  <frame id="144:269" name="💻 Case Study 4" x="3584" y="-1684" width="1920" height="8184">
    <frame id="144:270" name="Navigation" x="-0.1962890625" y="0" width="1920.392578125" height="170.0740966796875">
      <instance id="144:271" name="Navigation" x="0" y="0" width="1920" height="90.07408142089844" />
      <instance id="144:1118" name="Sub Nav" x="0" y="90.07408142089844" width="1920.392578125" height="80.00001525878906" />
    </frame>
    <frame id="144:285" name="Introduction" x="111" y="330.0740966796875" width="1698" height="848.18359375">
      <frame id="144:286" name="Left Content" x="111" y="330.0740966796875" width="1698" height="848.18359375">
        <frame id="144:1593" name="Introduction Copy" x="0" y="0" width="687" height="848.18359375">
          <instance id="144:1594" name="Intro" x="0" y="0" width="687" height="811.1836547851562" />
        </frame>
        <rounded-rectangle id="144:306" name="Frame 1 233" x="807" y="66.9259033203125" width="1104" height="775" />
      </frame>
    </frame>
    <frame id="144:307" name="Process" x="0" y="1338.2576904296875" width="1920" height="164">
      <text id="144:308" name="Identify Business Needs" x="243.92356872558594" y="40" width="129" height="84" />
      <instance id="144:1850" name="Arrow_01" x="404.923583984375" y="69.0864486694336" width="41.83057106746082" height="27.325753050725382" />
      <text id="144:310" name="User Research" x="478.754150390625" y="54" width="126" height="56" />
      <instance id="144:1854" name="Arrow_01" x="636.754150390625" y="69.0864486694336" width="41.83057106746128" height="27.325753050725382" />
      <text id="144:312" name="Personas" x="710.584716796875" y="68" width="134" height="28" />
      <instance id="144:1858" name="Arrow_01" x="876.584716796875" y="69.0864486694336" width="41.83057106746128" height="27.325753050725382" />
      <text id="144:314" name="User Journeys" x="950.415283203125" y="54" width="129" height="56" />
      <instance id="144:1862" name="Arrow_01" x="1111.415283203125" y="69.0864486694336" width="41.83057106746128" height="27.325753050725382" />
      <text id="144:316" name="Wireframing &amp; UI Design" x="1185.245849609375" y="54" width="198" height="56" />
      <instance id="144:1866" name="Arrow_01" x="1415.245849609375" y="69.0864486694336" width="41.83057106746128" height="27.325753050725382" />
      <text id="144:318" name="Development" x="1489.076416015625" y="68" width="187" height="28" />
    </frame>
    <frame id="144:319" name="Business problem" x="307" y="1662.2576904296875" width="1306" height="432">
      <frame id="144:320" name="Heading" x="43.5" y="0" width="637" height="386">
        <frame id="149:1939" name="Book cover" x="-0.095458984375" y="0.03076171875" width="285" height="397">
          <rounded-rectangle id="144:321" name="image 15" x="-0.095458984375" y="0.03076171875" width="284" height="350" />
          <text id="144:322" name="The book cover" x="-0.095458984375" y="366.03076171875" width="285" height="31" />
        </frame>
        <frame id="149:1940" name="Business Problem Heading" x="332.5" y="-0.2576904296875" width="305" height="231">
          <text id="149:1941" name="I ran a discovery session with the key stakeholder and identified the following needs." x="0.404296875" y="150" width="303" height="81" />
          <frame id="149:1942" name="H1" x="0" y="0.2884521484375" width="202" height="125.7115478515625">
            <text id="149:1943" name="business problem" x="0" y="27" width="202" height="99" />
            <text id="149:1944" name="the" x="0.404296875" y="0.2884521484375" width="29" height="29.543546676635742" />
          </frame>
        </frame>
      </frame>
      <frame id="144:327" name="List" x="760.5" y="0" width="502" height="290">
        <text id="153:1973" name="Increase engagement with the workbook. " x="0" y="0" width="502" height="24" />
        <instance id="153:1974" name="Vertical Divider" x="0" y="56" width="502" height="1" />
        <text id="144:330" name="Help users manage a change in teams effectively and healthily." x="0" y="89" width="484" height="23" />
        <instance id="153:1977" name="Vertical Divider" x="0" y="144" width="502" height="1" />
        <text id="144:332" name="Make the book more accessible to their users." x="0" y="177" width="400" height="24" />
        <instance id="153:1980" name="Vertical Divider" x="0" y="233" width="502" height="1" />
        <text id="144:334" name="Help build TRANSEARCH’s brand reputation as thought leaders." x="0" y="266" width="502" height="24" />
      </frame>
    </frame>
    <frame id="144:335" name="Talking to agents" x="235" y="2254.2578125" width="1450" height="417">
      <frame id="144:336" name="Context" x="389" y="80" width="672" height="257">
        <frame id="144:337" name="Logos" x="0" y="11" width="115" height="246">
          <rounded-rectangle id="144:338" name="image 19" x="0" y="0" width="115" height="115" />
          <rounded-rectangle id="144:339" name="image 18" x="0" y="131" width="115" height="115" />
        </frame>
        <frame id="144:340" name="Top" x="163" y="0" width="502" height="257">
          <frame id="144:341" name="Heading" x="0" y="0" width="259" height="90">
            <text id="144:343" name="Competitor research" x="0" y="0" width="259" height="90" />
          </frame>
          <frame id="144:344" name="WHAT" x="0" y="114" width="502" height="143">
            <frame id="144:345" name="List" x="0" y="0" width="502" height="130">
              <frame id="144:346" name="1" x="0" y="0" width="502" height="130">
                <text id="144:347" name="I evaluated how ‘Adobe PDF Reader’ and ‘Kindle’ tackled navigation and bookmarking along with identifying any potential pain points. Using my research here I encouraged the inclusion of highlighting and taking notes to make future reference easier for the user." x="0" y="0" width="510" height="130" />
              </frame>
            </frame>
          </frame>
        </frame>
      </frame>
    </frame>
    <frame id="144:348" name="Proto personas" x="337" y="2831.2578125" width="1246" height="387">
      <frame id="144:350" name="Content" x="337" y="2900.2578125" width="1246" height="318">
        <frame id="144:351" name="User types" x="0" y="0" width="415" height="318">
          <text id="144:352" name="The client provided us with 3 types of users that would have access to this book:" x="0" y="0" width="415" height="59" />
          <frame id="144:353" name="List" x="0" y="115" width="359" height="203">
            <text id="144:354" name="Newly placed employees." x="0" y="0" width="415" height="23" />
            <instance id="144:355" name="Vertical Divider" x="0" y="55" width="359" height="1" />
            <text id="144:356" name="Staff moving teams within the same company." x="0" y="88" width="415" height="26" />
            <instance id="144:357" name="Vertical Divider" x="0" y="146" width="359" height="1" />
            <text id="144:358" name="Executives experiencing a culture shift." x="0" y="179" width="400" height="24" />
          </frame>
        </frame>
        <frame id="144:359" name="Method &amp; Reflection" x="495" y="0" width="695" height="317">
          <text id="144:360" name="In a workshop with my team, we brainstormed potential driving forces, frustrations, goals and needs that may apply to our users. I used insights and understandings gained from this session in conjunction with my 3 user bases to build my personas. Once completed we used the persona’s as reference of our ‘empathy’ touch points." x="0" y="0" width="695" height="151" />
          <frame id="144:361" name="Future state" x="0" y="175" width="494" height="142">
            <text id="144:363" name="Reflection" x="24" y="24" width="392" height="21" />
            <text id="144:364" name="I missed an opportunity to workshop with some of the C-suite employees at my company to get more accurate insights, in lieu of user interviews." x="24" y="53" width="446" height="65" />
          </frame>
        </frame>
      </frame>
      <text id="144:349" name="Proto-personas" x="337" y="2831.2578125" width="376.0729675292969" height="45" />
    </frame>
    <frame id="144:365" name="User journeys &amp; Wireframing" x="0" y="3378.2578125" width="1920" height="1198">
      <frame id="144:367" name="User Joureny" x="237" y="3378.2578125" width="1446" height="621">
        <text id="144:368" name="User Journeys" x="100" y="80" width="194" height="90" />
        <frame id="144:369" name="Content" x="100" y="210" width="1246" height="159">
          <frame id="144:370" name="Context" x="0" y="0" width="583" height="159">
            <frame id="144:371" name="Introduction/Orientation" x="0" y="0" width="583" height="159">
              <text id="144:373" name="Introduction/Orientation" x="0" y="0" width="344" height="23" />
              <text id="144:377" name="Triggered on first login, the user is presented with an optional introductory feature that helps them identify important chapters by providing a chapter summary and an indication of the situations covered in each chapter.  This led into the feature tutorial mentioned above." x="0" y="63" width="583" height="96" />
            </frame>
          </frame>
          <frame id="144:378" name="Context" x="663" y="0" width="583" height="135">
            <frame id="144:379" name="Right" x="0" y="0" width="583" height="135">
              <text id="144:381" name="Primary Content" x="0" y="0" width="344" height="23" />
              <text id="144:385" name="This would be the users ‘everyday’ journey. This journey takes the user from login to reading content and completing the exercises. This is where we applied features like highlighting, note taking, cross referencing etc." x="0" y="63" width="583" height="72" />
            </frame>
          </frame>
        </frame>
        <frame id="144:386" name="Future state" x="100" y="409" width="505" height="132">
          <text id="144:388" name="Suggested improvement" x="20" y="20" width="392" height="21" />
          <text id="144:389" name="I identified the opportunity to provide our three types of users a curated set of chapters based on a selection made during onboarding." x="20" y="49" width="446" height="63" />
        </frame>
      </frame>
      <frame id="144:390" name="Wireframing" x="0" y="3993.2578125" width="1920" height="583">
        <frame id="196:2697" name="Group 1236" x="171.5" y="80" width="782" height="423">
          <rounded-rectangle id="196:2698" name="Wireframe" x="502.5" y="80" width="451" height="331" />
          <frame id="196:2699" name="Group 1235" x="171.5" y="180" width="574" height="323">
            <rounded-rectangle id="196:2700" name="Rectangle 3" x="171.5" y="180" width="574" height="323" />
            <text id="196:2701" name="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum et tortor et efficitur. Suspendisse potenti. Duis a elit at massa ornare tempus. Nulla iaculis nisi arcu, at facilisis sem efficitur in. Nunc accumsan nibh quam, et pellentesque nibh suscipit sit amet. Sed luctus facilisis sapien, sit amet faucibus lacus dignissim eget. Vestibulum justo urna, bibendum et elit nec, varius pharetra diam. Aenean tristique tellus nulla, a ornare nulla convallis sed. Nam tempus malesuada arcu vel suscipit. Pellentesque porta vel odio at pellentesque." x="279.5" y="328" width="337" height="112" />
            <text id="196:2702" name="Heading" x="277.5" y="238" width="188" height="80" />
            <frame id="196:2703" name="Pop up base" x="522.5" y="246" width="189" height="173" />
            <rounded-rectangle id="196:2706" name="Rectangle 6" x="522.5" y="288" width="64" height="131" />
            <rounded-rectangle id="196:2707" name="Rectangle 4" x="171.5" y="180" width="574" height="29" />
            <text id="196:2708" name="Logo" x="198.5" y="185" width="24" height="20" />
            <frame id="196:2709" name="Nav" x="361.5" y="187" width="184" height="16">
              <text id="196:2710" name="Home" x="0" y="0" width="23" height="16" />
              <text id="196:2711" name="The Book" x="31" y="0" width="36" height="16" />
              <text id="196:2712" name="My notes &amp; Exercisies" x="75" y="0" width="84" height="16" />
              <text id="196:2713" name="FAQ" x="167" y="0" width="17" height="16" />
            </frame>
            <text id="196:2714" name="Chapter 01" x="198.5" y="230" width="42" height="16" />
            <text id="196:2715" name="Exercises" x="611.5" y="230" width="37" height="16" />
            <text id="196:2716" name="Quick Notes" x="665.5" y="230" width="49" height="16" />
            <frame id="196:2717" name="Icons" x="684.5" y="189" width="26.75" height="11.75" />
            <text id="196:2724" name="Chapter 01" x="534.5" y="268" width="42" height="16" />
            <text id="196:2725" name="Chapter 03" x="534.5" y="293" width="42" height="16" />
            <text id="196:2726" name="Chapter 12" x="534.5" y="316" width="42" height="16" />
            <text id="196:2727" name="Chapter 13" x="534.5" y="341" width="42" height="16" />
            <rounded-rectangle id="196:2728" name="Rectangle 7" x="611.5" y="268" width="76" height="11" />
            <rounded-rectangle id="196:2729" name="Rectangle 8" x="602.5" y="279" width="82" height="11" />
            <rounded-rectangle id="196:2730" name="Rectangle 10" x="610.5" y="370" width="78" height="11" />
            <rounded-rectangle id="196:2731" name="Rectangle 9" x="602.5" y="290" width="30" height="11" />
            <text id="196:2732" name="“ Suspendisse potenti. Duis a elit at massa ornare ”" x="606.5" y="268" width="89" height="33" />
            <text id="196:2733" name="“ amet faucibus lacus ”" x="606.5" y="368" width="89" height="11" />
            <text id="196:2734" name="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum et tortor et efficitur. Suspendisse potenti." x="602.5" y="311" width="90" height="36" />
            <text id="196:2735" name="Donec interdum et tortor et efficitur. Suspendisse potenti." x="602.5" y="391" width="90" height="18" />
          </frame>
        </frame>
        <frame id="144:392" name="Inisght" x="1033.5" y="193" width="715" height="197">
          <text id="144:393" name="Wireframing" x="0" y="0" width="267" height="45" />
          <text id="144:394" name="Once wireframing was done I tested them on my team members to identify any issues or inconsistencies. Once those were identified I updated the designs and began testing again. I followed this iterative process until my users could use the interface easily and smoothly. The designs were then shown to our client and with their feedback we restarted this process." x="0" y="69" width="715" height="128" />
        </frame>
      </frame>
    </frame>
    <frame id="144:395" name="Design" x="236" y="4736.2578125" width="1448" height="2358.063720703125">
      <frame id="144:396" name="Typography &amp; Design" x="0" y="0" width="1443.390625" height="432">
        <frame id="144:397" name="References" x="677.66455078125" y="0" width="765.72607421875" height="432">
          <frame id="144:398" name="References" x="677.6646675430238" y="1.8189894035458565e-12" width="765.72607421875" height="432">
            <rounded-rectangle id="144:399" name="image 20" x="677.6646675430238" y="1.8189894035458565e-12" width="213.4276580810547" height="209.12466430664062" />
            <rounded-rectangle id="144:400" name="image 21" x="900.7799782119691" y="0.20408543944540725" width="209.1246795654297" height="209.1246795654297" />
            <rounded-rectangle id="144:401" name="image 22" x="900.7799782119691" y="222.87532043457213" width="209.1246795654297" height="209.1246795654297" />
            <rounded-rectangle id="144:402" name="image 23" x="677.6646163771147" y="222.67137145996276" width="209.1246795654297" height="209.1246795654297" />
            <rounded-rectangle id="144:403" name="image 24" x="1119.9112190566957" y="0.42076867819014296" width="323.4794616699219" height="431.15826416015625" />
          </frame>
        </frame>
        <text id="144:404" name="The client wanted the book to be distinctly on-brand but they were open to applying the CI in new ways, as this wouldn’t be accessed using their existing website. I took inspiration from magazine designs to create a clean and bold look that assisted in the scannability of the content." x="0" y="114" width="597.6646728515625" height="151" />
        <text id="144:405" name="Typography &amp; Design" x="0.3016776740550995" y="0" width="310.78564453125" height="90" />
      </frame>
      <frame id="144:406" name="Status tracker" x="0" y="577" width="1443" height="468">
        <frame id="144:407" name="Img" x="0" y="0" width="765" height="468">
          <rounded-rectangle id="144:408" name="Landing Page 1" x="0" y="0" width="765" height="430" />
          <text id="144:409" name="reader Dashboard" x="0" y="446" width="764" height="22" />
        </frame>
        <frame id="144:410" name="Content" x="845" y="0" width="598" height="408">
          <text id="144:411" name="Bookmarking where you left off" x="0" y="0" width="446" height="27" />
          <frame id="144:412" name="Inisght" x="0" y="51" width="598" height="357">
            <frame id="144:413" name="Problem" x="0" y="0" width="598" height="70">
              <text id="144:414" name="problem" x="0" y="0" width="142.71282958984375" height="21" />
              <text id="144:415" name="A user was assumed to be reading this content over a few days and would need to mark where they stopped reading." x="0" y="22" width="598" height="48" />
            </frame>
            <frame id="144:416" name="Design" x="0" y="118" width="598" height="118">
              <frame id="144:417" name="Design" x="0" y="2" width="598" height="113.0390625">
                <text id="144:418" name="solution" x="-9.094947017729282e-13" y="2" width="134.4112091064453" height="21" />
                <text id="144:419" name="I added in a bookmark feature that would automatically mark where you stopped interacting with the content. When a user opened the interface again they were presented with a button on the top right that would take them to the screen they left off on." x="0.49958229064941406" y="24.0390625" width="597.5004272460938" height="91" />
              </frame>
            </frame>
            <frame id="144:420" name="Outcome" x="0" y="284" width="598" height="73">
              <text id="144:421" name="Outcome" x="0" y="284" width="593.0414428710938" height="21" />
              <text id="144:422" name="Users are able to easily continue their journey working through the content without having to note their stopping point." x="0" y="309" width="598" height="48" />
            </frame>
          </frame>
        </frame>
      </frame>
      <frame id="144:423" name="Status tracker" x="0" y="1190" width="1443" height="468">
        <frame id="144:424" name="Content" x="0" y="0" width="598" height="457">
          <text id="144:425" name="Highlighting &amp; Note Taking" x="0" y="0" width="446" height="51" />
          <frame id="144:426" name="Inisght" x="0" y="75" width="598" height="382">
            <frame id="144:427" name="Problem" x="0" y="0" width="598" height="70">
              <text id="144:428" name="problem" x="0" y="0" width="142.71282958984375" height="21" />
              <text id="144:429" name="The content needed to be easily referenced by our user without them needing to scroll through whole chapters." x="0" y="22" width="598" height="48" />
            </frame>
            <frame id="144:430" name="Design" x="0" y="118" width="598" height="119">
              <frame id="144:431" name="Design" x="0" y="2" width="598" height="116.7421875">
                <text id="144:432" name="solution" x="-9.094947017729282e-13" y="2" width="128.91009521484375" height="21" />
                <text id="144:433" name="I made it possible for users to highlight or make a note in the content. To improve the access to the highlight or annotated content we implemented the ‘Quick Notes’ feature that allowed the user to scroll through all their notes without leaving a chapter." x="0" y="28.7421875" width="598" height="90" />
              </frame>
            </frame>
            <frame id="144:434" name="Outcome" x="0" y="285" width="598" height="97">
              <text id="144:435" name="Outcome" x="0" y="285" width="593.0414428710938" height="21" />
              <text id="144:436" name="When a user chooses to make a note, a dialog box will appear on the right-most column of the screen. All text that the user highlights or makes notes on are available under ‘Quick Notes’ or ‘My Notes &amp; Exercises’." x="0" y="310" width="598" height="72" />
            </frame>
          </frame>
        </frame>
        <frame id="144:437" name="Img" x="678" y="0" width="765" height="468">
          <rounded-rectangle id="144:438" name="Chapter One_1 1" x="0" y="0" width="765" height="430" />
          <text id="144:439" name="reader Dashboard" x="0" y="446" width="764" height="22" />
        </frame>
      </frame>
      <frame id="144:440" name="Status tracker" x="0" y="1803" width="1443.4998779296875" height="555.063720703125">
        <frame id="144:441" name="Img" x="0" y="0" width="765.4998779296875" height="555.063720703125">
          <frame id="144:442" name="Group 1233" x="0" y="0" width="765.4998779296875" height="555.063720703125">
            <rounded-rectangle id="144:443" name="iPad mini 8.3 - 1 1" x="0" y="-0.000024318695068359375" width="715.2069702148438" height="469.6504821777344" />
            <rounded-rectangle id="144:444" name="iPhone 17 - 1 2" x="543.0128784179688" y="71.34789276123047" width="222.48715209960938" height="483.7158203125" />
          </frame>
          <text id="144:445" name="tABLET &amp; MOBILE DESIGNS" x="0" y="492.0390625" width="764" height="22" />
        </frame>
        <frame id="144:446" name="Content" x="845.4998779296875" y="0" width="598" height="430">
          <text id="144:447" name="Responsive design" x="0" y="0" width="260" height="25" />
          <frame id="144:448" name="Inisght" x="0" y="49" width="598" height="381">
            <frame id="144:449" name="Problem" x="0" y="0" width="598" height="94">
              <text id="144:450" name="problem" x="0" y="0" width="142.71282958984375" height="21" />
              <text id="144:451" name="Our users were business people on the move during the day, reading between working sessions or meetings. This meant that they would need a interface that worked seamlessly between devices." x="0" y="22" width="598" height="72" />
            </frame>
            <frame id="144:452" name="Design" x="0" y="142" width="598" height="118">
              <frame id="144:453" name="Design" x="0" y="2" width="598" height="113.0390625">
                <text id="144:454" name="solution" x="-9.094947017729282e-13" y="2" width="134.4112091064453" height="21" />
                <text id="144:455" name="I adapted the interface for tablet and mobile. On mobile I replaced the progress tracker with a progress bar that sticks to the top of the screen to give the reader an idea of how far they are in the section. I tested the base font sizes on both device types to ensure comfortable readability." x="0.49958229064941406" y="24.0390625" width="597.5004272460938" height="91" />
              </frame>
            </frame>
            <frame id="144:456" name="Outcome" x="0" y="308" width="598" height="73">
              <text id="144:457" name="Outcome" x="0" y="308" width="593.0414428710938" height="21" />
              <text id="144:458" name="Users could continue their reading, highlights and note taking seamlessly whether they were on desktop, tablet or phone." x="0" y="333" width="598" height="48" />
            </frame>
          </frame>
        </frame>
      </frame>
    </frame>
    <frame id="144:459" name="Handover" x="237" y="7254.3212890625" width="1446" height="290">
      <frame id="144:460" name="Final" x="293" y="80" width="860" height="130">
        <text id="144:461" name="Development &amp; launch" x="0" y="25" width="334" height="80" />
        <text id="144:462" name="From feature ideation to final UI designs I worked closely with my developer this made handover and development seamless. I spent time collaborating with my developer during the build of the interface to assist with UI QA." x="382" y="0" width="470" height="130" />
      </frame>
    </frame>
    <instance id="144:463" name="Read More" x="111" y="7704.3212890625" width="1698" height="391" />
  </frame>
  <instance id="144:1079" name="ABSA" x="3609" y="-1938" width="463" height="141" />
  <instance id="144:1069" name="ABSA" x="1310" y="-1945" width="463" height="167" />
</canvas>IMPORTANT: After you call this tool, you MUST call get_design_context if trying to implement the design, since this tool only returns metadata. If you do not call get_design_context, the agent will not be able to implement the design.
```
