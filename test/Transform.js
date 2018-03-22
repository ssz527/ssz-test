
// Layers
var layers = [
  new ol.layer.Tile({
    name: 'Natural Earth',
    minResolution: 306,
    source: new ol.source.XYZ(
      {
        url: 'http://{a-d}.tiles.mapbox.com/v3/mapbox.natural-earth-hypso-bathy/{z}/{x}/{y}.png',
        attributions: [new ol.Attribution({ html: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' })]
      })
  })
]
// The map
var map = new ol.Map({
  target: 'map',
  view: new ol.View({
    zoom: 5,
    center: [261720, 5951081]
  }),
  controls: ol.control.defaults({ 'attribution': false }),
  layers: layers
});

// Style
function getStyle (feature) {
  return [new ol.style.Style(
    {
      image: new ol.style.RegularShape({
        fill: new ol.style.Fill({ color: [0, 0, 255, 0.4] }),
        stroke: new ol.style.Stroke({ color: [0, 0, 255, 1], width: 1 }),
        radius: 10,
        points: 3,
        angle: feature.get('angle') || 0
      }),
      fill: new ol.style.Fill({ color: [0, 0, 255, 0.4] }),
      stroke: new ol.style.Stroke({ color: [0, 0, 255, 1], width: 1 })
    })];
}

// New vector layer
var vector = new ol.layer.Vector(
  {
    name: 'Vecteur',
    source: new ol.source.Vector(),
    style: getStyle
  })
map.addLayer(vector);
var feature = new ol.Feature(new ol.geom.Polygon([[[34243, 6305749], [-288626, 5757848], [210354, 5576845], [34243, 6305749]]]));
var style = new ol.style.Style({
  fill: new ol.style.Fill({
    color: [0, 180, 255, 0.7]
  }),
  text: new ol.style.Text({
    color: [255, 255, 255, 1],
    text: 'Hello',
    font: '16pt bold'
  })
})
feature.setStyle(style);
vector.getSource().addFeature(feature);

/** Style the transform handles for the current interaction
*/
function setHandleStyle () {
  if (!(interaction instanceof ol.interaction.Transform)) return;
  if ($('#style').prop('checked')) { // Style the rotate handle
    var circle = new ol.style.RegularShape({
      fill: new ol.style.Fill({ color: [255, 255, 255, 0.01] }),
      stroke: new ol.style.Stroke({ width: 1, color: [0, 0, 0, 0.01] }),
      radius: 8,
      points: 10
    });
    interaction.setStyle('rotate',
      new ol.style.Style(
        {
          text: new ol.style.Text(
            {
              text: '\uf0e2',
              font: '16px Fontawesome',
              textAlign: 'left',
              fill: new ol.style.Fill({ color: 'red' })
            }),
          image: circle
        }));
    // Center of rotation
    interaction.setStyle('rotate0',
      new ol.style.Style(
        {
          text: new ol.style.Text(
            {
              text: '\uf0e2',
              font: '20px Fontawesome',
              fill: new ol.style.Fill({ color: [255, 255, 255, 0.8] }),
              stroke: new ol.style.Stroke({ width: 2, color: 'red' })
            })
        }));
    // Style the move handle
    interaction.setStyle('translate',
      new ol.style.Style(
        {
          text: new ol.style.Text(
            {
              text: '\uf047',
              font: '20px Fontawesome',
              fill: new ol.style.Fill({ color: [255, 255, 255, 0.8] }),
              stroke: new ol.style.Stroke({ width: 2, color: 'red' })
            })
        }))
  } else {
    interaction.setDefaultStyle();
  }
  // Refresh
  interaction.set('translate', interaction.get('translate'));
};

/** Set properties
*/
// function setPropertie (p) {
//   interaction.set(p, $("#" + p).prop('checked'));
//   if (!$("#scale").prop("checked")) $("#stretch").prop('disabled', true);
//   else $("#stretch").prop('disabled', false);
// }

// function setAspectRatio (p) {
//   if ($("#" + p).prop('checked')) interaction.set("keepAspectRatio", ol.events.condition.always);
//   else interaction.set("keepAspectRatio", function (e) { return e.originalEvent.shiftKey });
// }

var interaction = new ol.interaction.Transform(
  {
    translateFeature: $('#translateFeature').prop('checked'),
    scale: $('#scale').prop('checked'),
    rotate: $('#rotate').prop('checked'),
    keepAspectRatio: $('#keepAspectRatio').prop('checked') ? ol.events.condition.always : undefined,
    translate: $('#translate').prop('checked'),
    stretch: $('#stretch').prop('checked')
  });
map.addInteraction(interaction);
// Style handles
setHandleStyle();
// Events handlers
var startangle = 0;
var d = [0, 0];
interaction.on(['rotatestart', 'translatestart'], function (e) { // Rotation
  startangle = e.feature.get('angle') || 0;
  // Translation
  d = [0, 0];
});
interaction.on('rotating', function (e) {
  $('#info').text('rotate: ' + ((e.angle * 180 / Math.PI - 180) % 360 + 180).toFixed(2));
  // Set angle attribute to be used on style !
  e.feature.set('angle', startangle - e.angle);
});
interaction.on('translating', function (e) {
  d[0] += e.delta[0];
  d[1] += e.delta[1];
  $('#info').text('translate: ' + d[0].toFixed(2) + ',' + d[1].toFixed(2));
});
interaction.on('scaling', function (e) {
  $('#info').text('scale: ' + e.scale[0].toFixed(2) + ',' + e.scale[1].toFixed(2));
});
interaction.on(['rotateend', 'translateend', 'scaleend'], function (e) { $('#info').text(''); })
