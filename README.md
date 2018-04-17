<p align="center">
  <a href="https://prateekkalra.github.io/Selection-js"><img alt="SelectionJS" src="./logo.png" width="150px"></a>
</p>
<p align="center">
  A lightweight javascipt library which provides users with a set of options in the form of a small popover over the selected portion of text.
</p>  

 <p align="center">
  <a href="https://prateekkalra.github.io/Selection-js">Live Demo</a>
</p>

## Usage

[Script](https://github.com/prateekkalra/Selection-js/files/1920677/SelectionJS.zip)

Just Add the Script to the project and initialize


### Basic

```html
<script src="selection.min.js"></script>
<script>
  var selection = new Selection();
  selection.init();
</script>
```

### Advanced

```html
<script src="selection.min.js"></script>
<script>
  var selection = new Selection();
  selection.config({
    facebook: true,
    twitter: true,
    search:true,
    copy:true,
    speak:true,
    backgroundColor: 'crimson',
    iconColor: '#fff',
  }).init();
</script>
```

# Result


<p align="center">
<img alt="Demo" src="https://user-images.githubusercontent.com/29385192/38880290-f5e173ce-4282-11e8-9447-6cab91540735.PNG">
</p>
