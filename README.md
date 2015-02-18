### Chrome Extension for HackerEarth challenges
1.  git clone https://github.com/HackerEarth/hackerearth-chrome-extension.git

2. Visit chrome://extensions in your Chrome browser.

3. Ensure that the Developer mode checkbox in the top right-hand corner is selected.

4. Click *Load unpacked extension* to pop up a file-selection dialog.

5. Navigate to  hackerearth-chrome-extension/ (the directory where you cloned the github repository) and select it.

The extension will be loaded right away!

Added changes
1.) No icon was available for the extension. So I have added the icon.
2.) Added option for the user to filter challenges as per their requirement. Earlier Only college challenges were visible, changed the call using XMLHttpRequest such that it retrieve all types of challenges(as earlier) and user given a option filter the challenges using html selector.
3.) Once user choses to filter the challenges, new request is not sent to get the filtered result but result previously retrieved is used to 
filter.
4.) The types of challenges given as option say - hiring, collese etc are not hardcoded. The retrieved result from JSON is used to find what all option 
should be displayed as options in html selector
5.) Permssion was given only to http://www.hackerearth.com/ in the manifest file. changed that to give permission to https too.
6.) New changes (Feb 18, 2015): Now that I have separated the upcoming and ongoing challenges. If either of them is empty then, their parent/header gets hidden.
Such that if user challenges the challenge type from All to hiring and then back to ALL.In this case whenever the data is present corresponding header will beocme visible and whenever the data is not present the header will beocome invisible. this is done by adding visibility in reset function and then deciding whether to hide or show the header