import {
  getRedIcon,
  getBlueIcon,
  getOrangeIcon,
  orangeIcon,
  redStyle,
  blueStyle,
} from '../../../common/LIcons';

import HousePopupContent from './HousePopupContent';
import DistrictPopupContent from './DistrictPopupContent';
import RoadPopupContent from './RoadPopupContent';
import LZPopup from './LZPopup';
import './TopItem.less';

class TopItem {
  constructor(
    topItem,
    map,
    onLayerClick,
    content = 1,
    wktField = 'GEOM_WKT',
    wktField2 = 'GEOM_WKT2'
  ) {
    this.item = topItem;
    this.wktField = wktField;
    this.wktField2 = wktField2;
    this.map = map;
    let wkt = this.item[this.wktField];
    let wkt2 = this.item[this.wktField2];
    //console.log(this.item);
    if (wkt) {
      // console.log(wkt);
      this.layer = L.geoJSON(Terraformer.WKT.parse(wkt), {
        onEachFeature: (f, l) => {
          let centerPoint = null;
          if (l.setIcon) {
            l.setIcon(getRedIcon(content));
            centerPoint = l.getLatLng();
            this.defaultMarker = l;
          } else if (l.setStyle) {
            if (f.type.toLowerCase().indexOf('line') !== -1) {
              centerPoint = f.coordinates[parseInt(f.coordinates.length / 2)];
              centerPoint = [centerPoint[1], centerPoint[0]];
              l.setStyle({ fill: false, weight: 6, color: 'red' });
            } else {
              l.setStyle({ fill: true, weight: 1, color: 'blue' });
              centerPoint = turf.centroid(f);
              centerPoint = [
                centerPoint.geometry.coordinates[1],
                centerPoint.geometry.coordinates[0],
              ];
            }
            let bbox = turf.bbox(f);
            this.bounds = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
            this.defaultMarker = L.marker(centerPoint, { icon: getRedIcon(content) });
          }

          this.activeMarker = L.marker(centerPoint, { icon: getBlueIcon(content) });
          this.centerPoint = centerPoint;
          l.on('click', e => {
            onLayerClick && onLayerClick(this);
          });
        },
      });
      this.defaultMarker.on('click', e => {
        onLayerClick && onLayerClick(this);
      });
      this.layer.addLayer(this.defaultMarker);
      if (wkt2) {
        L.geoJSON(Terraformer.WKT.parse(wkt2), {
          onEachFeature: (f, l) => {
            if (l.setStyle) {
              l.setStyle({ fill: true, weight: 1, color: 'blue' });
              this.layer.addLayer(l);
            }
          },
        });
      }
    }
  }

  addTo(map) {
    if (this.layer) this.layer.addTo(map);
  }

  getPopupClass() {
    switch (this.item.TYPE) {
      case 'HOUSE':
        return HousePopupContent;
      case 'DISTRICT':
        return DistrictPopupContent;
      case 'ROAD':
        return RoadPopupContent;
    }
  }

  activeItem(map) {
    map = map || this.map;
    this.clear();
    this.addTo(map);
    this.activeMarker.addTo(map);
    // 请求获取popup等
    let PCls = this.getPopupClass();
    if (PCls) {
      let popupDom = $('<div></div>')
        .addClass('topitem')
        .get(0);
      let popup = ReactDOM.render(
        <PCls
          FULLADDRESS={this.item.FULLADDRESS}
          callback={d => {
            this.addSubItems(d);
          }}
          type={this.item.TYPE}
          id={this.item.ID}
        />,
        popupDom
      );
      this.popupDom = popupDom;
      this.popup = popup;
      //this.layer.bindPopup(popupDom);
      this.activeMarker.bindPopup(popupDom, { maxWidth: 400 }).openPopup();
    }
  }

  addSubItems(item) {
    if (this.item.TYPE === 'HOUSE') {
      this.addHouseSubItems(item);
    }
    if (this.item.TYPE === 'ROAD') {
      this.addRoadSubItems(item);
    }
  }

  addRoadSubItems(item) {
    if (item.MPList && item.MPList.length) {
      item.MPList.map(i => {
        let { GEOM_WKT } = i;
        if (GEOM_WKT) {
          let l = L.geoJSON(Terraformer.WKT.parse(GEOM_WKT), {
            onEachFeature: (f, l) => {
              if (l.setIcon)
                l.setIcon(getOrangeIcon('<span class="iconfont icon-bianhao"></span>'));
            },
          })
            .unbindPopup()
            .bindTooltip(i.MPNUM, {
              // permanent: true,
              direction: 'top',
              className: 'ct-lztip',
            });
          this.layer.addLayer(l);
        }
      });
    }
  }

  addHouseSubItems(item) {
    if (item.LZList && item.LZList.length) {
      item.LZList.map(i => {
        let { GEOM_WKT } = i;
        if (GEOM_WKT) {
          let dom = $('<div></div>').get(0);
          let popup = ReactDOM.render(<LZPopup data={i} name={item.NAME} />, dom);
          let l = L.geoJSON(Terraformer.WKT.parse(GEOM_WKT), {
            onEachFeature: (f, l) => {
              if (l.setIcon)
                l.setIcon(getOrangeIcon('<span class="iconfont icon-jianzhu"></span>'));
            },
          })
            .unbindPopup()
            .bindPopup(dom, { maxWidth: 370 })
            .bindTooltip(i.LZNUM, {
              // permanent: true,
              direction: 'top',
              className: 'ct-lztip',
            });
          l.on('click', e => {
            popup.getLZInfos();
          });
          this.layer.addLayer(l);
        }
      });
    }
  }

  center() {
    if (this.bounds) {
      this.map.fitBounds(this.bounds, { padding: [50, 50] });
    } else if (this.centerPoint) {
      this.map.setView(this.centerPoint, 16);
    }
  }

  clear() {
    this.layer.remove();
    this.activeMarker.remove();
  }
}

export default TopItem;
