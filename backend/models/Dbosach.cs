using System;
using System.Collections.Generic;

namespace backend;

public partial class Dbosach
{
    public int Id { get; set; }

    public int? Chieudai { get; set; }

    public int? Chieurong { get; set; }

    public int? Chudeid { get; set; }

    public string? Dinhdang { get; set; }

    public int? Dongia { get; set; }

    public string? Hinhanh { get; set; }

    public int? Nhaxuatbanid { get; set; }

    public int? Soluong { get; set; }

    public int? Sotrang { get; set; }

    public int? Tacgiaid { get; set; }

    public string? Tensach { get; set; }

    public virtual ChuDe? Chude { get; set; }

    public virtual ICollection<NhanXet> NhanXets { get; set; } = new List<NhanXet>();

    public virtual NhaXuatBan? Nhaxuatban { get; set; }

    public virtual ICollection<SachMuon> SachMuons { get; set; } = new List<SachMuon>();

    public virtual TacGium? Tacgia { get; set; }
}
