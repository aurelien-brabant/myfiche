module.exports =
  class bbcode
  {
    constructor()
    {

      this.bbcodeBalises = []
      this.htmlBalises = []

    }

    initializeBbcodeToHtml()
    {
      this.bbcodeBalises = [
        /\[g\]([\s\S]+?)\[\/g\]/g,
        /\[i\]([\s\S]+?)\[\/i\]/g,
        /\[s\]([\s\S]+?)\[\/s\]/g,
        /\[gauche\]([\s\S]+?)\[\/gauche\]/g,
        /\[centre\]([\s\S]+?)\[\/centre\]/g,
        /\[droite\]([\s\S]+?)\[\/droite\]/g,
        /\[justifie\]([\s\S]+?)\[\/justifie\]/g,
        /\[rouge\]([\s\S]+?)\[\/rouge\]/g,
        /\[bleu\]([\s\S]+?)\[\/bleu\]/g,
        /\[jaune\]([\s\S]+?)\[\/jaune\]/g,
        /\[vert\]([\s\S]+?)\[\/vert\]/g,
        /\[lien\](.+?)\[\/lien\]/g,
        /\[img\](.+?)\[\/img\]/g,
        /\[code\]([\s\S]+?)\[\/code\]/g,
        /\[t\]([\s\S]+?)\[\/t\]/g,
        /\[A\]([\s\S]+?)\[\/A\]/g
      ]

      this.htmlBalises = [
        '<strong>$1</strong>',
        '<em>$1</em>',
        '<u>$1</u>',
        '<div class="bbcode gauche">$1</div>',
        '<div class="bbcode centre">$1</div>',
        '<div class="bbcode droite">$1</div>',
        '<div class="bbcode justifie">$1</div>',
        '<span class="bbcode rouge">$1</span>',
        '<span class="bbcode bleu">$1</span>',
        '<span class="bbcode jaune">$1</span>',
        '<span class="bbcode vert">$1</span>',
        '<a href="$1" class="bbcode lien">lien</a>',
        '<a href="$1"><img src="$1" class="bbcode img col-8"></a>',
        '<div class="bbcode code"><div class="code label"><div class="code header">CODE</div><div class="code language">JS</div></div><div class="code content">$1</div></div>',
        '<h2 class="border-bottom">$1</h2>',
        '<h5 class="border-bottom">$1</h5>'
      ]
    }

    initializeHtmlToBbcode()
    {
      this.htmlBalises = [
        /\<strong\>(.+?)\<\/strong\>/g,
        /\<em\>(.+?)\<\/em\>/g,
        /\<u\>(.+?)\<\/u\>/g
      ]

      this.bbcodeBalises = [
        '[g]$1[/g]',
        '[i]$1[/i]',
        '[s]$1[/s]'
      ]
    }

    htmlToBbcode(content)
    {
      this.initializeHtmlToBbcode();
      var parsedContent = content;
      for (var i = 0; i < this.htmlBalises.length; i++)
      {
        parsedContent = parsedContent.replace(this.htmlBalises[i], this.bbcodeBalises[i]);
      }

      return parsedContent;
    }

    BbcodeToHtml(content)
    {
      this.initializeBbcodeToHtml();
      var parsedContent = content;
      for (var i = 0; i < this.htmlBalises.length; i++)
      {
        parsedContent = parsedContent.replace(this.bbcodeBalises[i], this.htmlBalises[i]);
      }

      return parsedContent;
    }




  }
