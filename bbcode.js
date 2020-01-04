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
        /\[b\](.+?)\[\/b\]/g,
        /\[i\](.+?)\[\/i\]/g,
        /\[s\](.+?)\[\/s\]/g,
      ]

      this.htmlBalises = [
        '<strong>$1</strong>',
        '<em>$1</em>',
        '<u>$1</u>'
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
        '[b]$1[/b]',
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
